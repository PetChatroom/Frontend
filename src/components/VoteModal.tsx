// src/components/VoteModal.tsx

import { useState } from "react";
import styles from "./VoteModal.module.css";

interface VoteModalProps {
  // A map of participant IDs to their friendly names
  participants: Record<string, string>;
  onVote: (surveyData: {
    votedUserId: string;
    reasoning: string;
    llmKnowledge: string;
    chatbotFrequency: string;
    age: number;
    education: string;
  }) => void;
}

function VoteModal({ participants, onVote }: VoteModalProps) {
  const [step, setStep] = useState(1);
  const [votedUserId, setVotedUserId] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [llmKnowledge, setLlmKnowledge] = useState("");
  const [chatbotFrequency, setChatbotFrequency] = useState("");
  const [age, setAge] = useState("");
  const [education, setEducation] = useState("");

  const handleNext = () => {
    if (step === 1 && !votedUserId) return;
    if (step === 3 && !llmKnowledge) return;
    if (step === 4 && !chatbotFrequency) return;
    if (step === 5 && !age) return;
    if (step === 6 && !education) return;
    
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Submit
      onVote({
        votedUserId,
        reasoning,
        llmKnowledge,
        chatbotFrequency,
        age: parseInt(age),
        education,
      });
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {step === 1 && (
          <>
            <h2>Time's Up!</h2>
            <p>Which player was the bot?</p>
            <div className={styles.voteOptions}>
              {Object.entries(participants).map(([id, name]) => (
                <button
                  key={id}
                  onClick={() => {
                    setVotedUserId(id);
                    setStep(2);
                  }}
                  className={styles.voteButton}
                >
                  {name}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>Why do you think this person was the bot?</h2>
            <textarea
              value={reasoning}
              onChange={(e) => setReasoning(e.target.value)}
              placeholder="Enter your reasoning here..."
              className={styles.textarea}
              rows={4}
            />
            <button onClick={handleNext} className={styles.nextButton}>
              Next
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2>Rate your LLM knowledge</h2>
            <div className={styles.radioGroup}>
              {["None", "Some", "High", "Expert"].map((level) => (
                <label key={level} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="llmKnowledge"
                    value={level}
                    checked={llmKnowledge === level}
                    onChange={(e) => setLlmKnowledge(e.target.value)}
                  />
                  {level}
                </label>
              ))}
            </div>
            <button onClick={handleNext} className={styles.nextButton} disabled={!llmKnowledge}>
              Next
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h2>Chatbot interaction frequency</h2>
            <div className={styles.radioGroup}>
              {["Never", "Daily", "Weekly", "Monthly"].map((freq) => (
                <label key={freq} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="chatbotFrequency"
                    value={freq}
                    checked={chatbotFrequency === freq}
                    onChange={(e) => setChatbotFrequency(e.target.value)}
                  />
                  {freq}
                </label>
              ))}
            </div>
            <button onClick={handleNext} className={styles.nextButton} disabled={!chatbotFrequency}>
              Next
            </button>
          </>
        )}

        {step === 5 && (
          <>
            <h2>Your age</h2>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className={styles.input}
              min="1"
              max="120"
            />
            <button onClick={handleNext} className={styles.nextButton} disabled={!age}>
              Next
            </button>
          </>
        )}

        {step === 6 && (
          <>
            <h2>Formal education</h2>
            <div className={styles.radioGroup}>
              {["None", "Highschool", "Undergraduate", "Postgraduate"].map((edu) => (
                <label key={edu} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="education"
                    value={edu}
                    checked={education === edu}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                  {edu}
                </label>
              ))}
            </div>
            <button onClick={handleNext} className={styles.nextButton} disabled={!education}>
              Submit
            </button>
          </>
        )}

        <div className={styles.progressIndicator}>
          Step {step} of 6
        </div>
      </div>
    </div>
  );
}

export default VoteModal;
