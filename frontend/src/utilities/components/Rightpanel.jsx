import React from 'react';

export default function RightPanel() {
  return (
    <div className="fixed top-24 right-0 h-[calc(100vh-4rem)] w-72 bg-gray-200 shadow-lg overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">About this website</h2>
        <img src="https://fcb-prod.s3.us-east-1.amazonaws.com/ckpoivpdx015ps3om0yuwpzw4/attachments/clh7zer2k0p8l0fpdb1artwpj-90-north-contact.full.png" alt="Enfund Logo" className="mt-4" />
        <p className="mt-4 text-gray-700"> 90 North is a sister concern of Enfund (90 North Ltd) headquartered in the UK. Enfund is a fast-scaling start-up backed by prominent global VCs and Real Estate debt and equity funders. Enfund is transforming construction with its innovative fintech solutions and high-end customer services. Enfund delivers transparency, de-risking and supply chains in the real estate industry across segments. 90 North enables Enfund with sales and marketing, technology, finance and quantity surveying functions.</p>

      </div>
    </div>
  );
}