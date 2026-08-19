import React from "react";

export function goldGradText(fontSize?: string): React.CSSProperties {
  return {
    background: "linear-gradient(135deg, #C9A84C 0%, #FFD700 40%, #E8B84B 70%, #C9A84C 100%)",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    animation: "goldFlow 4s linear infinite",
    ...(fontSize ? { fontSize } : {}),
  };
}

export function glassStyle(extraBorder?: string): React.CSSProperties {
  return {
    background: "linear-gradient(145deg, rgba(22, 52, 88, 0.92) 0%, rgba(10, 24, 46, 0.96) 100%)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: `1px solid ${extraBorder ?? "rgba(255, 215, 0, 0.45)"}`,
    boxShadow: "0 10px 40px rgba(0,0,0,0.55), 0 0 25px rgba(255,215,0,0.1), inset 0 1px 0 rgba(255,215,0,0.2)",
  };
}

export const GOLD_RATE: Record<string, number> = {
  "24K": 6850,
  "22K": 6275,
  "18K": 5125,
  "14K": 3985,
};

export const GALLERY = [
  {
    id: 1, tag: "BULLION", title: "Gold Bullion Bars", sub: "Investment Grade 99.9%",
    img: "https://images.unsplash.com/photo-1718752773283-de1f92513671?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 2, tag: "COINS", title: "Gold Sovereigns", sub: "24K Minted Coins",
    img: "https://images.unsplash.com/photo-1624365168056-daf44387e2ae?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 3, tag: "CHAINS", title: "Heritage Chains", sub: "22K Handcrafted",
    img: "https://images.unsplash.com/photo-1640183297213-863406155597?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 4, tag: "RINGS", title: "Bridal Rings", sub: "18K Diamond Set",
    img: "https://images.unsplash.com/photo-1626784214536-d859187e0bd0?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 5, tag: "BANGLES", title: "Temple Bangles", sub: "22K Temple Gold",
    img: "https://images.unsplash.com/photo-1718752773195-c19c1c329156?w=600&h=750&fit=crop&auto=format",
  },
  {
    id: 6, tag: "JEWELLERY", title: "Bridal Set", sub: "22K Filigree Work",
    img: "https://images.unsplash.com/photo-1606293926249-ed22e446d476?w=600&h=750&fit=crop&auto=format",
  },
];
