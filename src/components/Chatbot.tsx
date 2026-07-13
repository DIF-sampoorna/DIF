import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Minus, Sparkles, Bot, ArrowRight, Heart, HelpCircle, AlertCircle } from "lucide-react";

interface ChatbotProps {
  onNavigate: (tabId: string) => void;
  openDonationModal: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot({ onNavigate, openDonationModal }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaskar! 🙏 I am Sampoorna, your virtual co-pilot for the Deepjyoti India Foundation (DIF). I can help you learn about our healthcare campaigns, youth training, emotional literacy workshops, or navigate to our various departments.\n\nWhat would you like to explore today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Suggestions for quick action
  const SUGGESTIONS = [
    { label: "What is Project Sampoorna?", text: "What is Project Sampoorna?" },
    { label: "Show me health camps", text: "Where are your community health camps?" },
    { label: "Check financials", text: "Show me the financials" },
    { label: "How can I volunteer?", text: "How can I volunteer or support DIF?" },
  ];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasNewMessage(false);
      setShowAvatarPopup(false);
    }
  }, [messages, isOpen]);

  // Timed pop up has been removed per user instructions to avoid pop-up alerts.
  useEffect(() => {
    setShowAvatarPopup(false);
  }, [isOpen]);

  // Heuristic smart fallback response directly in the client in case of complete server connection loss or timeout
  const getLocalFallbackMessage = (queryText: string): string => {
    const query = queryText.toLowerCase().trim();
    const queryWords = query.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, " ").split(/\s+/).filter(Boolean);

    interface TopicDefinition {
      id: string;
      keywords: string[];
      tab: string;
      response: string;
    }

    const localTopics: TopicDefinition[] = [
      {
        id: "locations",
        keywords: ["location", "locatioin", "locations", "locatioins", "where", "place", "places", "area", "areas", "geograph", "region", "regions", "city", "cities", "operate", "operations", "outreach", "reach", "map", "shillong", "guwahati", "assam", "meghalaya", "mumbai", "maharashtra", "bonda", "amsing", "panjabari", "panikhaiti", "bonga", "narengi", "office", "hq", "headquarters", "registered"],
        tab: "about",
        response: "DIF operates monthly primary health clinics in Guwahati (Assam), youth counseling and entrepreneurship workshops in Shillong (Meghalaya), and hospital medical clowning sessions in Mumbai (Maharashtra)."
      },
      {
        id: "sampoorna",
        keywords: ["sampoorna", "samporna", "somporna", "health", "camp", "camps", "preventive", "care", "screening", "screenings", "doctor", "doctors", "physician", "vitals", "clinic", "clinics", "medicine", "medicines", "diagnost", "diagnostics", "hygiene", "hb", "hemoglobin", "bmi", "card", "cards", "bnw", "cpr", "first aid", "choking", "preventive diagnostics", "cervical", "cancer", "anemia", "diabetes", "sanitation", "kid"],
        tab: "programs",
        response: "Project Sampoorna is our primary health campaign running 16 monthly health camps (₹24,000/camp) and tracking Hb levels and vitals of 100 women on longitudinal cards (BNW-001 to BNW-100)."
      },
      {
        id: "mental_health",
        keywords: ["mental", "emotional", "wellbeing", "well-being", "literacy", "mindful", "resilience", "worry", "thoughts", "feelings", "feeling", "oyf", "owning", "workshop", "workshops", "cohort", "cohorts", "cotton", "handique", "clown", "clowning", "laughter", "therapy", "geriatric", "psychological", "dementia", "memory", "coping", "anxiety", "anxious", "stress"],
        tab: "programs",
        response: "Owning Your Feelings (OYF) runs 3-month emotional literacy workshops at Cotton University & Handique Girls' College, alongside pediatric and geriatric hospital medical clowning."
      },
      {
        id: "youth",
        keywords: ["youth", "career", "counsel", "counseling", "counselling", "school", "schools", "student", "students", "class", "classes", "st. francis", "francis", "entrepreneur", "entrepreneurship", "ferrando", "soft skill", "soft skills", "coaching", "livelihood", "livelihoods", "joy", "giving", "give", "distribution", "rations", "nutrition", "sweets", "toys", "garments", "winter", "clothes"],
        tab: "programs",
        response: "We provide school counseling at St. Francis in Shillong, entrepreneurship training at Ferrando Shelter Home, and host year-round nutrition/garment distribution drives."
      },
      {
        id: "research",
        keywords: ["research", "data", "data-driven", "metrics", "track", "tracking", "excel", "sheet", "database", "before-and-after", "pre-session", "post-session", "survey", "surveys", "framework", "evidence", "longitudinal", "bnw", "kpi", "kpis", "dataset", "datasets", "evidence-based"],
        tab: "programs",
        response: "Our Research & Data-Driven Models track medical checkups, Hb recovery progress (IDs BNW-001 to BNW-100), and emotional resilience survey metrics."
      },
      {
        id: "financials",
        keywords: ["financial", "financials", "audit", "audits", "ledger", "ledgers", "balance", "balances", "cost", "costs", "budget", "budgets", "rupee", "rupees", "expenditure", "income", "grant", "grants", "tax", "exempt", "exemption", "transparency", "account", "accounting", "accounts", "dharmendra", "bansal", "12a", "80g", "niti", "aayog", "darpan", "csr", "compliance", "deficit"],
        tab: "financials",
        response: "Led by Dharmendra Bansal, DIF maintains 100% transparent audits. We are 12A, 80G, CSR compliant, and registered on NITI Aayog NGO-Darpan."
      },
      {
        id: "about",
        keywords: ["about", "deepjyoti", "dif", "foundation", "organization", "ngo", "team", "founder", "founders", "board", "member", "members", "ashok", "garg", "taranna", "deepshika", "leads", "director", "coordinator", "amrita", "borkotoky", "murchana", "deep jyoti", "saikia", "who are you", "what is this", "tell me about", "who"],
        tab: "about",
        response: "DIF was founded by Ashok Garg and Taranna Deepjyoti Garg. Core program leads are Amrita Borkotoky (Program Director) and Murchana (Program Coordinator)."
      },
      {
        id: "volunteer_donate",
        keywords: ["volunteer", "volunteering", "donate", "donating", "donation", "donations", "support", "gift", "join", "involved", "help", "contribute", "partner", "partners", "red cross", "art of living", "sponsor", "money", "pledge"],
        tab: "get-involved",
        response: "You can sponsor a health camp (₹24,000), support student emotional training (₹1,200), fund a woman's care card (₹3,600), or register as a volunteer."
      },
      {
        id: "testimonials",
        keywords: ["testimonial", "testimonials", "stories", "story", "review", "reviews", "feedback", "quotes", "beneficiary", "beneficiaries", "baishali", "sharma"],
        tab: "testimonials",
        response: "Beneficiaries report positive impact from our dermatological care, menstrual health awareness, and OYF emotional resilience programs."
      },
      {
        id: "contact",
        keywords: ["contact", "address", "registered office", "mail", "email", "phone", "number", "registered", "write", "office", "hq"],
        tab: "get-involved",
        response: "Reach us at contact@dif-sampoorna.ngo or (+91) 7428008008. Registered Office: Ready Money Terrace, Worli Naka, Mumbai 400018."
      }
    ];

    let bestTopic: TopicDefinition | null = null;
    let maxScore = 0;

    for (const topic of localTopics) {
      let score = 0;
      
      // Exact phrase check in user input gets maximum weighting
      for (const kw of topic.keywords) {
        const kwLower = kw.toLowerCase().trim();
        if (query.includes(kwLower)) {
          score += kwLower.length * 4; // Absolute match weight
        }
        
        // Token substring and prefix check
        for (const word of queryWords) {
          if (word === kwLower) {
            score += kwLower.length * 3;
          } else if (word.length >= 4 && kwLower.startsWith(word)) {
            score += word.length * 1.5;
          } else if (kwLower.length >= 4 && word.startsWith(kwLower)) {
            score += kwLower.length * 1.5;
          }
        }
      }
      
      if (score > maxScore) {
        maxScore = score;
        bestTopic = topic;
      }
    }

    if (bestTopic && maxScore > 0) {
      onNavigate(bestTopic.tab);
      return `${bestTopic.response} [NAVIGATE: ${bestTopic.tab}]`;
    }

    return "I am Sampoorna AI, your digital assistant. Ask about our locations, health camps, emotional workshops, team, or financials.";
  };

  // Send message process
  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Set up AbortController with an 8-second client timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const chatHistory = [...messages, userMessage];

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: chatHistory }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error("Failed to receive response from server.");
      }

      const data = await response.json();
      const replyText = data.text || "";

      // Check if reply text has navigate command
      const navigateMatch = replyText.match(/\[NAVIGATE:\s*(\w+-[-\w]*|\w+)\]/i);
      
      let finalReplyText = replyText;
      if (navigateMatch) {
        // Extract tab ID and trigger callback immediately for real-time responsiveness
        const tabId = navigateMatch[1].toLowerCase().trim();
        onNavigate(tabId);
        // Clean out the navigation command from user-facing text
        finalReplyText = replyText.replace(/\[NAVIGATE:\s*(\w+-[-\w]*|\w+)\]/gi, "").trim();
      }

      setMessages((prev) => [...prev, { role: "assistant", content: finalReplyText }]);
      
      if (!isOpen) {
        setHasNewMessage(true);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn("Chatbot API connection failed or timed out. Triggering instant client intelligence fallback...", err);
      
      const localReplyText = getLocalFallbackMessage(textToSend);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: localReplyText,
        },
      ]);
      
      if (!isOpen) {
        setHasNewMessage(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-4 md:bottom-6 right-6 z-50 flex flex-col items-end select-none" id="sampoorna-chatbot-container">
      {/* Small animated chatbot avatar and speech bubble */}
      <AnimatePresence>
        {!isOpen && showAvatarPopup && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1, 
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
              }
            }}
            exit={{ opacity: 0, y: 20, scale: 0.85, transition: { duration: 0.15 } }}
            className="mb-3 flex items-end gap-3 max-w-[290px] select-none"
            id="sampoorna-avatar-popup"
          >
            {/* Speech bubble */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { delay: 0.2 }
              }}
              onClick={() => {
                setIsOpen(true);
                setShowAvatarPopup(false);
              }}
              className="relative bg-white border-2 border-mhe-charcoal p-2.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,46,49,1)] cursor-pointer text-left group hover:bg-mhe-cream/20 transition-colors"
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAvatarPopup(false);
                  sessionStorage.setItem("sampoorna_avatar_dismissed", "true");
                }}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-mhe-yellow hover:bg-mhe-orange rounded-full border-2 border-mhe-charcoal flex items-center justify-center text-mhe-charcoal cursor-pointer text-[10px] font-bold shadow-[1px_1px_0px_0px_rgba(28,46,49,1)] transition-transform hover:scale-110"
                title="Close"
              >
                <X className="w-3 h-3 stroke-[3]" />
              </button>

              <p className="text-[9px] font-mono font-bold text-mhe-teal uppercase tracking-wider mb-0.5 flex items-center gap-1">
                <span>Sampoorna AI</span>
                <Sparkles className="w-3 h-3 text-mhe-orange animate-pulse" />
              </p>
              <p className="text-[11px] text-mhe-charcoal font-sans font-semibold leading-tight pr-1.5">
                Namaskar! May I help you explore? 🙏
              </p>

              {/* Triangle pointer of speech bubble */}
              <div className="absolute right-[-6px] bottom-[14px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white" />
              <div className="absolute right-[-8px] bottom-[13px] w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[7px] border-l-mhe-charcoal -z-10" />
            </motion.div>

            {/* Avatar container */}
            <motion.div
              onClick={() => {
                setIsOpen(true);
                setShowAvatarPopup(false);
              }}
              className="relative w-11 h-11 rounded-full border-2 border-mhe-charcoal bg-mhe-yellow flex items-center justify-center cursor-pointer shadow-[3px_3px_0px_0px_rgba(28,46,49,1)] group shrink-0"
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Outer pulse effect */}
              <span className="absolute inset-0 rounded-full border border-mhe-orange animate-ping opacity-25" />
              
              <span className="text-xl group-hover:scale-115 transition-transform duration-200 select-none">👩‍💼</span>
              
              {/* Active dot indicator */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-mhe-charcoal" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[92vw] sm:w-[360px] md:w-[390px] max-h-[380px] md:max-h-[440px] bg-mhe-cream border-4 border-mhe-charcoal rounded-3xl shadow-[6px_6px_0px_0px_rgba(28,46,49,1)] flex flex-col overflow-hidden mb-4"
            id="sampoorna-chatbot-panel"
          >
            {/* Header section styled elegantly matching MHE identity */}
            <div className="bg-mhe-teal text-white p-3 border-b-4 border-mhe-charcoal flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 bg-mhe-cream rounded-full border-2 border-mhe-charcoal flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(28,46,49,1)] text-lg select-none">
                    👩‍💼
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-mhe-charcoal animate-ping" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-mhe-charcoal" />
                </div>
                <div>
                  <h4 className="font-sans font-extrabold text-xs md:text-sm flex items-center gap-1.5 tracking-tight">
                    <span>Sampoorna AI</span>
                    <Sparkles className="w-3.5 h-3.5 text-mhe-yellow animate-pulse" />
                  </h4>
                  <p className="text-[9px] md:text-[10px] text-mhe-cream/80 font-mono font-medium tracking-wide">
                    DIF DIGITAL CO-PILOT • ACTIVE
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded bg-mhe-yellow hover:bg-mhe-yellow/85 border-2 border-mhe-charcoal text-mhe-charcoal cursor-pointer transition-transform hover:scale-105"
                  title="Minimize"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </div>
 
            {/* Middle Notification Bar notifying transparency */}
            <div className="bg-mhe-orange/10 border-b-2 border-mhe-charcoal/30 py-1.5 px-3 flex items-center gap-2 text-[10px] text-mhe-charcoal/80 font-mono select-none">
              <Bot className="w-3 h-3 text-mhe-orange animate-pulse" />
              <span>Ask about health camps, colleges, OYF, or financials.</span>
            </div>
 
            {/* Chat Messages Log list */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-3 space-y-3 bg-mhe-cream-light/60 flex flex-col min-h-[140px] max-h-[180px] md:max-h-[220px]"
              style={{ contentVisibility: "auto" }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-2xl border-2 border-mhe-charcoal text-[11px] md:text-xs font-sans tracking-tight leading-relaxed shadow-[2px_2px_0px_0px_rgba(28,46,41,1)] ${
                      msg.role === "user"
                        ? "bg-mhe-yellow text-mhe-charcoal rounded-br-none"
                        : "bg-white text-mhe-charcoal rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-snug">{msg.content}</p>
                  </div>
                </div>
              ))}
 
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-3 py-2 rounded-2xl border-2 border-mhe-charcoal bg-white rounded-bl-none shadow-[2px_2px_0px_0px_rgba(28,46,41,1)] flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-mhe-teal" />
                    <span className="w-1.5 h-1.5 rounded-full bg-mhe-orange" />
                    <span className="w-1.5 h-1.5 rounded-full bg-mhe-yellow" />
                    <span className="text-[10px] font-mono text-black ml-1">Sampoorna is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
 
            {/* Predefined Quick Suggestion Chips */}
            <div className="p-2 bg-white border-t-2 border-mhe-charcoal select-none">
              <div className="flex flex-wrap gap-1 max-h-[60px] overflow-y-auto pr-1">
                {SUGGESTIONS.map((sug, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(sug.text)}
                    className="text-[9px] md:text-[10px] font-sans font-semibold text-mhe-charcoal bg-mhe-mint-light/45 hover:bg-mhe-mint-light border border-mhe-charcoal/50 hover:border-mhe-charcoal px-2 py-0.5 rounded-full cursor-pointer transition-all duration-150 transform hover:scale-[1.01] flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3 text-mhe-teal shrink-0" />
                    <span>{sug.label}</span>
                  </button>
                ))}
              </div>
            </div>
 
            {/* Input Form Box */}
            <form 
              onSubmit={handleFormSubmit}
              className="p-2.5 bg-mhe-cream border-t-4 border-mhe-charcoal flex items-center gap-1.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Sampoorna or open a tab..."
                className="flex-1 bg-white border-2 border-mhe-charcoal px-2.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-sans placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-mhe-teal text-mhe-charcoal"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`p-2 rounded-xl border-2 border-mhe-charcoal bg-mhe-teal text-white shadow-[2px_2px_0px_0px_rgba(28,46,49,1)] hover:bg-mhe-teal/95 transition-all cursor-pointer ${
                  (!input.trim() || isLoading) && "opacity-50 cursor-not-allowed shadow-none translate-y-0"
                }`}
              >
                <Send className="w-3.5 h-3.5 fill-current" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* Floating circular activator button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setHasNewMessage(false);
          setShowAvatarPopup(false);
        }}
        className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-mhe-charcoal flex items-center justify-center bg-mhe-orange text-white cursor-pointer shadow-[4px_4px_0px_0px_rgba(28,46,49,1)] hover:shadow-[2px_2px_0px_0px_rgba(28,46,49,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200"
        id="chatbot-trigger-bubble"
        aria-label="Toggle Live Help Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 stroke-[3]" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 md:w-7 md:h-7 fill-current stroke-2 animate-wiggle" />
            <span className="absolute -top-1 -right-1 block w-2.5 h-2.5 rounded-full bg-mhe-yellow border border-mhe-charcoal animate-ping" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
