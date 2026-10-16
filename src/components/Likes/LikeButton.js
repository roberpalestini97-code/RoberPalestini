import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useLikes } from "../../context/LikesContext";
import { useLang } from "../../context/LanguageContext";
import "./likes.css";

const PARTICLES = 8;

// Heart button with a count. `variant`: "card" | "nav" | "detail".
function LikeButton({ id, variant = "card", label }) {
  const { enabled, counts, liked, like } = useLikes();
  const { t } = useLang();
  const [burst, setBurst] = useState(0);
  const isLiked = Boolean(liked[id]);
  const count = counts[id] || 0;
  const showCount = enabled || count > 0;
  const name = label || t("likes.like");

  const onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) return;
    like(id);
    setBurst((b) => b + 1);
  };

  return (
    <button
      type="button"
      className={`like-button like-${variant} ${isLiked ? "is-liked" : ""}`}
      onClick={onClick}
      aria-pressed={isLiked}
      aria-label={isLiked ? t("likes.liked") : name}
      title={isLiked ? t("likes.liked") : name}
    >
      <span className="like-heart" key={burst}>
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        {burst > 0 && (
          <span className="like-burst" aria-hidden="true">
            {Array.from({ length: PARTICLES }, (_, i) => (
              <i key={i} style={{ "--a": `${(360 / PARTICLES) * i}deg` }} />
            ))}
          </span>
        )}
      </span>
      {showCount && <span className="like-count">{count}</span>}
    </button>
  );
}

export default LikeButton;
