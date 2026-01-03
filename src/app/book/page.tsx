"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import siteConfig from "@/config/site.json";
import { useTheme } from "@/components/ui/ThemeProvider";
import { motion } from "framer-motion";
import { BoltIcon, CalendarDaysIcon } from "@heroicons/react/24/solid";

export default function BookPage() {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "meeting" });
            cal("ui", {
                "theme": isDarkMode ? "dark" : "light",
                "styles": {
                    "branding": {
                        "brandColor": "#FF5722"
                    }
                },
                "hideEventTypeDetails": false,
                "layout": "month_view"
            });
        })();
    }, [isDarkMode]);

    return (
        <div className="min-h-screen bg-[var(--hw-chassis)] relative overflow-hidden pt-20">
            {/* Grid Background Pattern - Matches FeatureSection.tsx */}
            <div className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: 'linear-gradient(var(--hw-text-main) 1px, transparent 1px), linear-gradient(90deg, var(--hw-text-main) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Noise Texture Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-noise mix-blend-overlay"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">

                {/* Consistent Header Pattern - Matched with FeatureSection */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-4 border-[var(--hw-border)] pb-8 gap-6">
                    <div>
                        <div className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#FF5722] rounded-full animate-pulse"></span>
                            System Connection
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-[var(--hw-text-main)] tracking-tight uppercase">
                            Book Your <span className="text-[#FF5722]">Demo</span>
                        </h1>
                    </div>

                    {/* Secondary Status Indicator */}
                    <div className="flex items-center gap-3 bg-[var(--hw-panel)] px-5 py-2.5 rounded-xl border border-[var(--hw-border)] shadow-sm whitespace-nowrap">
                        <BoltIcon className="w-5 h-5 text-[#FF5722]" />
                        <div className="flex flex-col">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--hw-text-muted)] opacity-70">Status</span>
                            <span className="font-mono text-xs font-bold text-[var(--hw-text-main)] uppercase">Connection_Active</span>
                        </div>
                    </div>
                </div>

                {/* Integrated Cal.com Scheduler - No "Box", just the content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative min-h-[850px] w-full"
                >
                    {/* Subtle frame or background if needed, but not a heavy box */}
                    <div className="absolute inset-0 bg-[var(--hw-panel)]/30 rounded-3xl border-2 border-[var(--hw-border)]/40 dark:border-[var(--hw-border)]/20 backdrop-blur-sm -z-10 shadow-sm"></div>

                    <Cal
                        namespace="meeting"
                        calLink="pixpoc-ai/book"
                        style={{ width: "100%", height: "auto", minHeight: "850px" }}
                        config={{
                            layout: "month_view",
                            theme: isDarkMode ? "dark" : "light"
                        }}
                    />
                </motion.div>

                {/* Action Bar / Status Footer */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-4">
                    <div className="flex items-center gap-4 text-[var(--hw-text-muted)] opacity-60 font-mono text-[10px] uppercase tracking-[0.3em]">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>Session_Token: 0x{Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
                    </div>
                    <div className="px-4 py-1.5 rounded bg-[var(--hw-border)]/30 text-[9px] font-bold tracking-widest text-[var(--hw-text-muted)] uppercase">
                        Authenticated_Endpoint
                    </div>
                </div>
            </div>
        </div>
    );
}
