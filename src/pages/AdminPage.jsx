import React, { useState } from 'react';
import FileUploadCard from '../components/admin/FileUploadCard';
import PipelineVisualizer from '../components/admin/PipelineVisualizer';
import ChunkInspector from '../components/admin/ChunkInspector';

export default function AdminPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentStep, setCurrentStep] = useState(0); // 0 = idle, 1..5 = steps, 6 = done
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartPipeline = () => {
    if (!selectedFile || isProcessing) return;

    setIsProcessing(true);
    setCurrentStep(1); // Step 1: Upload

    setTimeout(() => {
      setCurrentStep(2); // Step 2: Text Extraction

      setTimeout(() => {
        setCurrentStep(3); // Step 3: Split into Chunks

        setTimeout(() => {
          setCurrentStep(4); // Step 4: Create Embeddings

          setTimeout(() => {
            setCurrentStep(5); // Step 5: Store in ChromaDB

            setTimeout(() => {
              setCurrentStep(6);
              setIsProcessing(false);
            }, 1200);
          }, 1400);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setCurrentStep(0);
    setIsProcessing(false);
  };

  return (
    <div className="admin-page animate-fade-in">
      <div className="page-header">
        <h1 className="page-title">Document Ingestion Pipeline</h1>
      </div>

      <div className="admin-layout">
        {/* Upload Card */}
        <FileUploadCard
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          isProcessing={isProcessing}
          onStartPipeline={handleStartPipeline}
          resetPipeline={handleReset}
        />

        {/* Dynamic Moving Pipeline Visualizer */}
        <PipelineVisualizer
          currentStep={currentStep}
          isProcessing={isProcessing}
        />

        {/* Processed Chunks Inspector (Visible when chunking passes) */}
        <ChunkInspector visible={currentStep >= 3} />
      </div>
    </div>
  );
}
