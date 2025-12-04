import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useState } from "react";

interface AskAidaProps {
  open: boolean;
  onClose: () => void;
}

const AskAida = ({ open, onClose }) => {
  const [text, setText] = useState("");
  return (
    <div className={`fixed inset-0 z-50 pointer-events-none ${open ? "" : "hidden"}`} aria-hidden={!open}>
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

      {/* panel */}
      <div className="absolute right-4 bottom-4 w-full max-w-md pointer-events-auto">
        <div className="bg-card rounded-xl shadow-2xl overflow-hidden border border-border/40">
          <div className="p-4 flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-600/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">Ask Aida</h4>
                <button className="text-sm text-muted-foreground" onClick={onClose}>Close</button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Assistant curated from Curana Health content.</p>
            </div>
          </div>

          <div className="p-4 border-t border-border/20">
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask a question or paste text to summarize..." className="w-full min-h-[110px] resize-y rounded-md p-3 bg-transparent border border-border/30 outline-none focus:ring-2 focus:ring-accent/30" />
            <div className="mt-3 flex items-center gap-2 justify-end">
              <Button variant="ghost" className="text-sm">Clear</Button>
              <Button className="text-sm" onClick={() => { /* hook to send to Aida */ setText(""); onClose(); }}>Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AskAida;
