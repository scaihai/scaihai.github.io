import React, { useState, useEffect, useCallback } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { PortfolioStats } from './components/PortfolioStats';
import { MarketControls } from './components/MarketControls';
import { HistoryCharts } from './components/HistoryCharts';
import { TradeLog } from './components/TradeLog';
import { SimulationConfig, PortfolioState, TradeRecord, HistoryPoint } from './types';
import { LayoutDashboard } from 'lucide-react';

const INITIAL_PRICE = 50000;

const App: React.FC = () => {
  // Configuration State
  const [config, setConfig] = useState<SimulationConfig>({
    initialCapital: 10000,
    targetBtcPercent: 50,
    rebalanceThreshold: 5.0,
  });

  // Simulation State
  const [portfolio, setPortfolio] = useState<PortfolioState>({
    cash: 5000,
    btcAmount: 0.1,
    btcPrice: INITIAL_PRICE,
    totalEquity: 10000,
    day: 0,
    date: 'Start',
  });

  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  // Initialize Simulation (Default / Reset)
  const initSimulation = useCallback(() => {
    const startPrice = INITIAL_PRICE;
    const targetBtcVal = config.initialCapital * (config.targetBtcPercent / 100);
    const startBtcAmt = targetBtcVal / startPrice;
    const startCash = config.initialCapital - targetBtcVal;

    const initialState: PortfolioState = {
      cash: startCash,
      btcAmount: startBtcAmt,
      btcPrice: startPrice,
      totalEquity: config.initialCapital,
      day: 0,
      date: 'N/A'
    };

    setPortfolio(initialState);
    
    // Initial Log
    const initTrade: TradeRecord = {
      day: 0,
      date: 'Start',
      type: 'INIT',
      btcPrice: startPrice,
      btcAmountDelta: startBtcAmt,
      cashDelta: -targetBtcVal,
      reason: 'Portfolio Inception',
      totalEquity: config.initialCapital,
      btcAllocation: config.targetBtcPercent,
    };

    const initHistory: HistoryPoint = {
      day: 0,
      date: 'Start',
      equity: config.initialCapital,
      holdEquity: config.initialCapital,
      btcPrice: startPrice,
    };

    setTrades([initTrade]);
    setHistory([initHistory]);
  }, [config.initialCapital, config.targetBtcPercent]);

  // Run init on mount
  useEffect(() => {
    initSimulation();
  }, []); 

  const handleReset = () => {
    initSimulation();
  };

  // Run Simulation from CSV
  const runCsvSimulation = (csvData: string) => {
    const lines = csvData.trim().split('\n');
    if (lines.length < 2) return;

    // Parse Headers
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    // Find indexes
    // Try to find Close, if not try 'close'
    let closeIdx = headers.indexOf('close');
    
    // Try to find Date, Datetime, or Timestamp
    let dateIdx = headers.indexOf('datetime');
    if (dateIdx === -1) dateIdx = headers.indexOf('date');
    if (dateIdx === -1) dateIdx = headers.indexOf('timestamp');

    if (closeIdx === -1) {
        alert("CSV must have a 'Close' column.");
        return;
    }

    // Process Data
    const dataPoints: { price: number; date: string }[] = [];
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        
        const price = parseFloat(parts[closeIdx]);
        let dateStr = dateIdx !== -1 ? parts[dateIdx] : `Row ${i}`;

        // If using timestamp as date, format it if possible
        if (dateIdx !== -1 && headers[dateIdx] === 'timestamp') {
           const ts = parseInt(parts[dateIdx]);
           if (!isNaN(ts)) {
               dateStr = new Date(ts).toLocaleString();
           }
        }

        if (!isNaN(price)) {
            dataPoints.push({ price, date: dateStr });
        }
    }

    if (dataPoints.length === 0) return;

    // --- EXECUTE SIMULATION LOGIC ---
    
    // 1. Initialize based on first data point
    const startPrice = dataPoints[0].price;
    const startTargetBtcVal = config.initialCapital * (config.targetBtcPercent / 100);
    const startBtcAmt = startTargetBtcVal / startPrice;
    const startCash = config.initialCapital - startTargetBtcVal;

    let currentPortfolio: PortfolioState = {
        cash: startCash,
        btcAmount: startBtcAmt,
        btcPrice: startPrice,
        totalEquity: config.initialCapital,
        day: 0,
        date: dataPoints[0].date
    };

    // HODL reference
    const initialHoldBtc = startBtcAmt;
    const initialHoldCash = startCash;

    const newTrades: TradeRecord[] = [];
    const newHistory: HistoryPoint[] = [];

    // Init Record
    newTrades.push({
        day: 0,
        date: dataPoints[0].date,
        type: 'INIT',
        btcPrice: startPrice,
        btcAmountDelta: startBtcAmt,
        cashDelta: -startTargetBtcVal,
        reason: 'Portfolio Inception',
        totalEquity: config.initialCapital,
        btcAllocation: config.targetBtcPercent,
    });

    newHistory.push({
        day: 0,
        date: dataPoints[0].date,
        equity: config.initialCapital,
        holdEquity: config.initialCapital,
        btcPrice: startPrice,
    });

    // Loop through rest
    for (let i = 1; i < dataPoints.length; i++) {
        const point = dataPoints[i];
        const newPrice = point.price;
        
        // 1. Calculate stats
        const currentBtcValue = currentPortfolio.btcAmount * newPrice;
        const currentEquity = currentBtcValue + currentPortfolio.cash;
        const currentBtcWeight = (currentBtcValue / currentEquity) * 100;
        const hodlEquity = (initialHoldBtc * newPrice) + initialHoldCash;

        // 2. Check Rebalance
        const deviation = currentBtcWeight - config.targetBtcPercent;
        const shouldRebalance = Math.abs(deviation) > config.rebalanceThreshold;

        let trade: TradeRecord;

        if (shouldRebalance) {
            const targetBtcValue = currentEquity * (config.targetBtcPercent / 100);
            const diffBtcValue = targetBtcValue - currentBtcValue;
            
            const btcAmountDelta = diffBtcValue / newPrice;
            const cashDelta = -diffBtcValue;

            currentPortfolio.btcAmount += btcAmountDelta;
            currentPortfolio.cash += cashDelta;
            currentPortfolio.totalEquity = (currentPortfolio.btcAmount * newPrice) + currentPortfolio.cash;
            
            trade = {
                day: i,
                date: point.date,
                type: btcAmountDelta > 0 ? 'BUY' : 'SELL',
                btcPrice: newPrice,
                btcAmountDelta: btcAmountDelta,
                cashDelta: cashDelta,
                reason: `Deviation ${deviation.toFixed(2)}%`,
                totalEquity: currentPortfolio.totalEquity,
                btcAllocation: (currentPortfolio.btcAmount * newPrice) / currentPortfolio.totalEquity * 100,
            };
        } else {
             trade = {
                day: i,
                date: point.date,
                type: 'HOLD',
                btcPrice: newPrice,
                btcAmountDelta: 0,
                cashDelta: 0,
                reason: 'Within threshold',
                totalEquity: currentEquity,
                btcAllocation: currentBtcWeight,
            };
            // Update portfolio equity for next iteration / display even if no trade
            currentPortfolio.totalEquity = currentEquity;
        }
        
        currentPortfolio.btcPrice = newPrice;
        currentPortfolio.day = i;
        currentPortfolio.date = point.date;

        newTrades.push(trade);
        newHistory.push({
            day: i,
            date: point.date,
            equity: currentPortfolio.totalEquity,
            holdEquity: hodlEquity,
            btcPrice: newPrice
        });
    }

    setPortfolio(currentPortfolio);
    setTrades(newTrades);
    setHistory(newHistory);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <LayoutDashboard className="w-8 h-8 text-indigo-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">RebalSim</h1>
              <p className="text-slate-400 text-sm">Automated Portfolio Rebalancing Simulator</p>
            </div>
          </div>
          <div className="flex gap-2 text-xs font-mono text-slate-500 bg-slate-900 px-4 py-2 rounded-lg border border-slate-800">
            <span>SIM_VER: 1.0.5</span>
            <span className="text-slate-700">|</span>
            <span>CSV_MODE</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Config */}
          <div className="lg:col-span-1">
            <ConfigPanel 
              config={config} 
              onConfigChange={setConfig} 
              onReset={handleReset}
              isSimulating={history.length > 1}
            />
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-3 space-y-6">
            <PortfolioStats 
              portfolio={portfolio} 
              config={config} 
              initialCapital={config.initialCapital}
            />
            
            <MarketControls 
              onRunSimulation={runCsvSimulation} 
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HistoryCharts history={history} />
              <TradeLog trades={trades} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;