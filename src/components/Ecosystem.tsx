"use client";

import React, { useState, useEffect } from "react";
import { Database, Link, Terminal, Play, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LogItem {
  timestamp: string;
  type: "success" | "info" | "warning";
  module: string;
  content: string;
}

export default function Ecosystem() {
  const [activeTab, setActiveTab] = useState<"migrations" | "endpoints" | "provision">("migrations");
  const [logs, setLogs] = useState<LogItem[]>([]);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const generateLog = () => {
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      
      let newLog: LogItem;

      if (activeTab === "migrations") {
        const migrations = [
          { module: "DB_SYNC", content: "Applied schema migration: add_index_on_user_sessions", type: "success" as const },
          { module: "DB_SYNC", content: "Checking integrity constraints for transaction table... complete.", type: "info" as const },
          { module: "DB_SYNC", content: "Pruned 1,200 obsolete transient tokens.", type: "success" as const },
          { module: "DB_SYNC", content: "Slow query warning: scan on 'invoices' took 142ms. Recommendation: add composite index.", type: "warning" as const },
        ];
        const selected = migrations[Math.floor(Math.random() * migrations.length)];
        newLog = { timestamp: timeStr, ...selected };
      } else if (activeTab === "endpoints") {
        const apis = [
          { module: "API_GATEWAY", content: "GET /v1/telemetry - Status: 200 OK | Response time: 8.4ms", type: "success" as const },
          { module: "API_GATEWAY", content: "POST /v1/webhooks/stripe - Status: 201 Created | Response time: 24.1ms", type: "success" as const },
          { module: "API_GATEWAY", content: "GET /v1/invoices/pdf - Status: 200 OK | Response time: 104.2ms", type: "info" as const },
          { module: "API_GATEWAY", content: "POST /v1/auth/token - Status: 401 Unauthorized | Rate limit warning", type: "warning" as const },
        ];
        const selected = apis[Math.floor(Math.random() * apis.length)];
        newLog = { timestamp: timeStr, ...selected };
      } else {
        const provisionSteps = [
          { module: "CLOUD_OPS", content: "Provisioned serverless executor instance node-us-east-4", type: "success" as const },
          { module: "CLOUD_OPS", content: "Allocated static gateway proxy IP 192.168.4.15", type: "info" as const },
          { module: "CLOUD_OPS", content: "Configured TLS v1.3 encryption handshake credentials", type: "success" as const },
          { module: "CLOUD_OPS", content: "Autoscaling rule triggered: scaling cluster-eu-west replica count: 4 -> 6", type: "info" as const },
        ];
        const selected = provisionSteps[Math.floor(Math.random() * provisionSteps.length)];
        newLog = { timestamp: timeStr, ...selected };
      }

      setLogs((prev) => [newLog, ...prev.slice(0, 10)]);
    };

    if (logs.length === 0) {
      generateLog();
    }

    const interval = setInterval(generateLog, 2500);
    return () => clearInterval(interval);
  }, [activeTab, isRunning, logs.length]);

  return (
    <section id="ecosystem" className="relative py-28 bg-bg-space overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-semibold">
              Infrastructure Observability
            </h2>
            <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#2d0012]">
              Real-time platform logs.
            </h3>
            <p className="text-slate-600 font-light leading-relaxed text-sm">
              Verify platform execution directly. Toggle below to watch live simulations of our database sync triggers, API response times, and automated infrastructure deployments.
            </p>

            {/* Selector Buttons */}
            <div className="flex flex-col gap-3 pt-4">
              {[
                { id: "migrations", label: "Schema Migrations", icon: <Database className="w-4 h-4" /> },
                { id: "endpoints", label: "API Endpoint Routing", icon: <Link className="w-4 h-4" /> },
                { id: "provision", label: "Infrastructure Triggers", icon: <Terminal className="w-4 h-4" /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setLogs([]);
                  }}
                  className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 text-left ${
                    activeTab === tab.id
                      ? "bg-white border-[#970747]/[0.1] text-[#970747] shadow-[0_1px_3px_rgba(151,7,71,0.02)]"
                      : "bg-transparent border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeTab === tab.id ? "text-[#970747]" : "text-slate-400"}>
                      {tab.icon}
                    </span>
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && <span className="w-1.5 h-1.5 rounded-full bg-[#970747]"></span>}
                </button>
              ))}
            </div>

            {/* Feed Control */}
            <div className="flex items-center gap-4 pt-4 text-[10px] font-mono">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-1.5 text-slate-500 hover:text-[#970747] transition-colors"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-400" />
                    Pause Live Feed
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-slate-400" />
                    Resume Live Feed
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Side: Log Console */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#970747]/[0.08] bg-white p-6 min-h-[360px] max-h-[360px] overflow-hidden flex flex-col font-mono text-xs shadow-[0_20px_50px_-10px_rgba(151,7,71,0.04)]">
              {/* Console header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#970747]/[0.06] mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold">
                    veila-syslog // {activeTab}
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-semibold">utf-8 stream</span>
              </div>

              {/* Console Log Messages */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {logs.map((log, index) => (
                    <motion.div
                      key={index + "-" + log.timestamp}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 leading-relaxed text-[11px]"
                    >
                      <span className="text-slate-400 shrink-0">[{log.timestamp}]</span>
                      <span
                        className={`shrink-0 uppercase text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          log.type === "success"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                            : log.type === "warning"
                            ? "bg-amber-50 text-amber-700 border border-amber-200/50"
                            : "bg-rose-50 text-[#970747] border border-rose-200/50"
                        }`}
                      >
                        {log.module}
                      </span>
                      <span className="text-slate-800">{log.content}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {logs.length === 0 && (
                  <div className="text-slate-400 text-center py-20 italic">
                    Awaiting syslog package sequence...
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
