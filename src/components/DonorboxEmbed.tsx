"use client";

import Script from "next/script";

interface DonorboxEmbedProps {
  campaign: string;
}

export default function DonorboxEmbed({ campaign }: DonorboxEmbedProps) {
  return (
    <>
      <Script
        src="https://donorbox.org/widgets.js"
        strategy="lazyOnload"
        type="module"
      />
      {/* @ts-expect-error — dbox-widget is a Donorbox custom element */}
      <dbox-widget
        campaign={campaign}
        type="donation_form"
        enable-auto-scroll="true"
        style={{
          maxWidth: "500px",
          minWidth: "250px",
          width: "100%",
        }}
      />
    </>
  );
}
