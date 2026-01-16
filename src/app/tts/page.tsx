"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MicrophoneIcon,
    GlobeAltIcon,
    BoltIcon,
    CodeBracketIcon,
    SparklesIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';

const LANGUAGES = [
    'Hindi', 'Bengali', 'Marathi', 'Gujarati', 'Telugu',
    'Kannada', 'English', 'Chhattisgarhi', 'Maithili',
    'Bhojpuri', 'Magahi'
];

const SAMPLE_TEXTS: { [key: string]: string } = {
    'Hindi': 'नमस्ते, आप कैसे हैं?',
    'Bengali': 'নমস্কার, আপনি কেমন আছেন?',
    'Marathi': 'नमस्कार, तुम्ही कसे आहात?',
    'English': 'Hello, how are you today?',
    'Gujarati': 'નમસ્તે, તમે કેમ છો?',
    'Telugu': 'నమస్కారం, మీరు ఎలా ఉన్నారు?',
    'Kannada': 'ನಮಸ್ಕಾರ, ನೀವು ಹೇಗಿದ್ದೀರಿ?',
};

export default function TTSPage() {
    const [language, setLanguage] = useState('Hindi');
    const [gender, setGender] = useState('Male');
    const [text, setText] = useState(SAMPLE_TEXTS['Hindi']);
    const [isGenerating, setIsGenerating] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    // Waitlist form state
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleLanguageChange = (lang: string) => {
        setLanguage(lang);
        if (SAMPLE_TEXTS[lang]) {
            setText(SAMPLE_TEXTS[lang]);
        }
    };

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage(null);

        try {
            const response = await fetch('/api/tts-waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmitMessage({ type: 'success', text: data.message || 'Successfully joined the waitlist!' });
                setEmail('');
            } else {
                setSubmitMessage({ type: 'error', text: data.error || 'Failed to join waitlist' });
            }
        } catch (error) {
            setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setAudioUrl(null);

        try {
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    language,
                    gender,
                    text,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.error || 'Failed to generate speech');
                setIsGenerating(false);
                return;
            }

            const data = await response.json();

            // Convert base64 to audio URL
            const audioBlob = base64ToBlob(data.audio, 'audio/wav');
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);

        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate speech. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    // Helper function to convert base64 to Blob
    const base64ToBlob = (base64: string, mimeType: string) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type: mimeType });
    };

    return (
        <div className="min-h-screen bg-[var(--hw-chassis)]">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] bg-noise mix-blend-overlay"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="inline-block bg-gradient-to-r from-[#FF5722] to-[#FF7043] text-white px-4 py-2 rounded-full mb-6 shadow-lg"
                        >
                            <div className="flex items-center gap-2">
                                <SparklesIcon className="w-5 h-5" />
                                <span className="text-sm font-bold tracking-wide">NEW RELEASE</span>
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold text-[var(--hw-text-main)] mb-6 tracking-tight"
                        >
                            Say Hello to <span className="text-[#FF5722]">Indian Voices</span>
                        </motion.h1>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-[var(--hw-text-muted)] max-w-3xl mx-auto font-medium mb-12"
                        >
                            Natural, familiar speech in 11 Indian languages, with authentic accents that sound just like India.
                        </motion.p>

                        {/* Waitlist Form - Prominent Position */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-gradient-to-r from-[#FF5722]/10 to-[#FF7043]/10 backdrop-blur-sm rounded-2xl border-2 border-[#FF5722]/30 p-6 md:p-8">
                                <h3 className="text-xl md:text-2xl font-bold text-[var(--hw-text-main)] mb-3 text-center">
                                    🚀 Join the Waitlist
                                </h3>
                                <p className="text-[var(--hw-text-muted)] mb-6 text-center">
                                    Be among the first to access our Indian Voice TTS API
                                </p>

                                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        disabled={isSubmitting}
                                        className="flex-1 bg-white dark:bg-[var(--hw-chassis)] border-2 border-[var(--hw-border)] rounded-lg px-4 py-3 text-[var(--hw-text-main)] font-medium focus:outline-none focus:border-[#FF5722] transition-colors disabled:opacity-50"
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="py-3 px-8 rounded-xl text-base font-bold uppercase tracking-wider transition-all bg-[#FF5722] text-white shadow-[0_4px_0_#B33016] hover:bg-[#FF6D3F] hover:scale-[1.02] active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                    >
                                        {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                                    </button>
                                </form>

                                {submitMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`mt-4 p-3 rounded-lg text-center font-medium ${submitMessage.type === 'success'
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                                            }`}
                                    >
                                        {submitMessage.text}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Interactive Demo */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-[var(--hw-panel)] rounded-2xl border-[2px] border-[var(--hw-border)] shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-8 md:p-12 relative overflow-hidden">
                            {/* Decorative Screws */}
                            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-[var(--hw-border)] shadow-inner flex items-center justify-center">
                                <div className="w-1.5 h-px bg-[#A09890] rotate-45"></div>
                            </div>
                            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[var(--hw-border)] shadow-inner flex items-center justify-center">
                                <div className="w-1.5 h-px bg-[#A09890] rotate-45"></div>
                            </div>
                            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-[var(--hw-border)] shadow-inner flex items-center justify-center">
                                <div className="w-1.5 h-px bg-[#A09890] rotate-45"></div>
                            </div>
                            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-[var(--hw-border)] shadow-inner flex items-center justify-center">
                                <div className="w-1.5 h-px bg-[#A09890] rotate-45"></div>
                            </div>

                            <h3 className="text-2xl font-bold text-[var(--hw-text-main)] mb-8 flex items-center gap-2">
                                <MicrophoneIcon className="w-6 h-6 text-[#FF5722]" />
                                Try It Now
                            </h3>

                            <div className="space-y-6">
                                {/* Language & Voice Selectors */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[var(--hw-text-muted)] uppercase tracking-wider mb-2">
                                            Language
                                        </label>
                                        <select
                                            value={language}
                                            onChange={(e) => handleLanguageChange(e.target.value)}
                                            className="w-full bg-[var(--hw-chassis)] border-2 border-[var(--hw-border)] rounded-lg px-4 py-3 text-[var(--hw-text-main)] font-medium focus:outline-none focus:border-[#FF5722] transition-colors"
                                        >
                                            {LANGUAGES.map((lang) => (
                                                <option key={lang} value={lang}>{lang}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[var(--hw-text-muted)] uppercase tracking-wider mb-2">
                                            Voice
                                        </label>
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="w-full bg-[var(--hw-chassis)] border-2 border-[var(--hw-border)] rounded-lg px-4 py-3 text-[var(--hw-text-main)] font-medium focus:outline-none focus:border-[#FF5722] transition-colors"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Text Input */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-sm font-bold text-[var(--hw-text-muted)] uppercase tracking-wider">
                                            Input Text
                                        </label>
                                        <span className="text-xs text-[var(--hw-text-muted)] font-mono">
                                            {text.length} / 5000
                                        </span>
                                    </div>
                                    <textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        maxLength={5000}
                                        rows={4}
                                        placeholder="Type here..."
                                        className="w-full bg-[var(--hw-chassis)] border-2 border-[var(--hw-border)] rounded-lg px-4 py-3 text-[var(--hw-text-main)] font-medium focus:outline-none focus:border-[#FF5722] transition-colors resize-none"
                                    />
                                </div>

                                {/* Generate Button */}
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating || !text.trim()}
                                    className="w-full py-4 px-6 rounded-xl text-base font-bold uppercase tracking-wider transition-all bg-[#FF5722] text-white shadow-[0_4px_0_#B33016] hover:bg-[#FF6D3F] hover:scale-[1.02] active:shadow-none active:translate-y-[4px] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <BoltIcon className="w-5 h-5" />
                                            Generate Speech
                                        </>
                                    )}
                                </button>

                                {/* Audio Player */}
                                {audioUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-[var(--hw-screen)] rounded-lg p-6 border-2 border-[#2A7A6F]"
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></div>
                                            <span className="text-[#479F8F] font-mono text-sm uppercase tracking-wider">
                                                Output Audio
                                            </span>
                                        </div>
                                        <audio
                                            controls
                                            src={audioUrl}
                                            className="w-full"
                                            style={{
                                                filter: 'sepia(20%) saturate(70%) hue-rotate(160deg)',
                                            }}
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--hw-panel)] border-t border-[var(--hw-border)]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--hw-text-main)] text-center mb-12">
                        Why Choose <span className="text-[#FF5722]">PixPoc TTS</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: GlobeAltIcon,
                                title: '11 Indian Languages',
                                description: 'From Hindi to Bhojpuri, we cover the linguistic diversity of India with authentic regional accents.'
                            },
                            {
                                icon: BoltIcon,
                                title: 'GPU-Accelerated',
                                description: 'Lightning-fast synthesis with <300ms latency. Real-time performance for production workloads.'
                            },
                            {
                                icon: CodeBracketIcon,
                                title: 'Latency below 200ms',
                                description: 'Ultra-fast synthesis optimized for real-time applications. Perfect for live conversations and interactive experiences.'
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="bg-[var(--hw-chassis)] p-6 rounded-lg border border-[var(--hw-border)] hover:border-[#FF5722] transition-all duration-300 group"
                            >
                                <feature.icon className="w-12 h-12 text-[#FF5722] mb-4 group-hover:scale-110 transition-transform" />
                                <h3 className="text-xl font-bold text-[var(--hw-text-main)] mb-2">{feature.title}</h3>
                                <p className="text-[var(--hw-text-muted)]">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
