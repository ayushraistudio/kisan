"use client";

import Sidebar from '@/components/layout/Sidebar';
import Topbar from '@/components/layout/Topbar';
import { CloudRain, Wind, Droplets, Mic, ImageIcon, CheckCircle2, Leaf, MapPin, Calendar, Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import axios from 'axios';

const yieldData = [
  { name: 'Oct', value: 30 }, { name: 'Nov', value: 45 },
  { name: 'Dec', value: 60 }, { name: 'Jan', value: 80 },
];

export default function Dashboard() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedImage(URL.createObjectURL(file));
      setImageFile(file);
      setAnalysisResult(null); // Reset previous result
      toast.success("Image selected! Ready for analysis.");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/jpeg': [], 'image/png': [] }, maxFiles: 1 });

  // API Call to FastAPI Backend
  const handleAnalyze = async () => {
    if (!imageFile) return;
    
    setIsAnalyzing(true);
    const toastId = toast.loading("AI is analyzing the crop image...");
    
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("crop", "Wheat");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/analyze-disease", formData);
      setAnalysisResult(response.data);
      toast.success(`Analysis Complete: ${response.data.prediction} detected!`, { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Analysis failed. Make sure backend is running.", { id: toastId });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Dynamic values based on API response or defaults
  const currentRisk = analysisResult ? analysisResult.confidence : 78;
  const currentDisease = analysisResult ? analysisResult.prediction : "Risk of Leaf Rust";
  const riskLabel = analysisResult ? analysisResult.risk_level : "High Risk";
  const riskColor = riskLabel === "High Risk" ? "#ef4444" : "#22c55e";

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#070310' }}>
      <Sidebar />
      
      <div style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        
        <main style={{ marginTop: '80px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Top Banner */}
          <div style={{
            background: 'linear-gradient(to right, #4c1d95, #2e1065)',
            borderRadius: '16px', padding: '32px', border: '1px solid #7c3aed',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '36px', color: '#FFFFFF', margin: '0 0 8px 0' }}>Farming Smarter <br/> with AI</h2>
              <p style={{ color: '#d8b4fe', margin: 0 }}>Real-time insights. Real impact.</p>
            </div>
            <h3 style={{ fontSize: '24px', fontStyle: 'italic', color: '#FFF' }}>"Healthy Farms<br/>Happier Farmers"</h3>
          </div>

          {/* Location & Filters Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
             {[
               { icon: <MapPin color="#8b5cf6" />, title: 'Farm Location', val: 'Ghaziabad, UP' },
               { icon: <Leaf color="#eab308" />, title: 'Select Crop', val: 'Wheat' },
               { icon: <Leaf color="#22c55e" />, title: 'Crop Stage', val: 'Vegetative' },
               { icon: <Calendar color="#8b5cf6" />, title: 'Sowing Date', val: '15 Nov 2025' }
             ].map((item, i) => (
                <div key={i} style={{ backgroundColor: '#160d2b', border: '1px solid #2d1f4a', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {item.icon}
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: '#8b849c' }}>{item.title}</p>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#FFF' }}>{item.val}</p>
                  </div>
                </div>
             ))}
          </div>

          {/* Main 4-Column Widgets */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            
            <div style={{ backgroundColor: '#160d2b', border: '1px solid #2d1f4a', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, color: '#d8b4fe' }}>Current Weather</p>
                <span style={{ fontSize: '10px', color: '#22c55e' }}>● Live</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '24px 0' }}>
                <CloudRain style={{ color: '#3b82f6', width: '48px', height: '48px' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '32px', color: '#FFF' }}>26°C</h3>
                  <p style={{ margin: 0, color: '#8b849c' }}>Partly Cloudy</p>
                </div>
              </div>
            </div>

            {/* Dynamic Disease Risk Chart */}
            <div style={{ backgroundColor: '#160d2b', border: '1px solid #2d1f4a', borderRadius: '12px', padding: '20px', position: 'relative' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ margin: 0, color: '#d8b4fe' }}>Disease Risk</p>
                <span style={{ fontSize: '10px', backgroundColor: riskColor === '#ef4444' ? '#ef4444' : 'rgba(34,197,94,0.2)', color: riskColor === '#ef4444' ? '#fff' : '#22c55e', padding: '2px 8px', borderRadius: '12px' }}>
                  {riskLabel}
                </span>
              </div>
              <div style={{ height: '120px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{ value: currentRisk }, { value: 100 - currentRisk }]} innerRadius={40} outerRadius={55} startAngle={180} endAngle={0} dataKey="value" stroke="none">
                      <Cell fill={riskColor} /><Cell fill="#2d1f4a" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', textAlign: 'center' }}>
                <h4 style={{ margin: 0, fontSize: '24px', color: '#FFF' }}>{currentRisk}%</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#8b849c' }}>{currentDisease}</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#160d2b', border: '1px solid #2d1f4a', borderRadius: '12px', padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <p style={{ margin: 0, color: '#d8b4fe' }}>Yield Outlook</p>
                <span style={{ fontSize: '10px', backgroundColor: 'rgba(34,197,94,0.2)', color: '#22c55e', padding: '2px 8px', borderRadius: '12px' }}>+ 12%</span>
              </div>
              <div style={{ height: '100px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b849c' }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{fill: '#2d1f4a'}} />
                    <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={{ background: 'linear-gradient(to bottom, #1e113a, #160d2b)', border: '1px solid #4c1d95', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid #8b5cf6' }}>
                <Mic style={{ color: '#a78bfa', width: '32px', height: '32px' }} />
              </div>
              <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', color: '#FFF' }}>Ask Kisan Saathi</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#8b849c', textAlign: 'center' }}>Speak or type your question in your language</p>
            </div>

          </div>

          {/* Image Upload Area */}
          <div style={{ backgroundColor: '#160d2b', border: '1px solid #2d1f4a', borderRadius: '12px', padding: '24px' }}>
             <h3 style={{ margin: '0 0 16px 0', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}>
               <ImageIcon color="#a78bfa" /> Upload Image for Disease Detection
             </h3>
             <div style={{ display: 'flex', gap: '24px' }}>
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div {...getRootProps()} style={{
                    flex: 1, border: isDragActive ? '2px dashed #8b5cf6' : '2px dashed #4c1d95',
                    borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: isDragActive ? 'rgba(139, 92, 246, 0.1)' : 'transparent'
                  }}>
                    <input {...getInputProps()} />
                    {uploadedImage ? (
                      <div style={{ textAlign: 'center' }}>
                        <img src={uploadedImage} alt="Crop" style={{ height: '120px', borderRadius: '8px', marginBottom: '16px' }} />
                        <p style={{ color: '#22c55e', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={16} /> Image Selected</p>
                      </div>
                    ) : (
                      <>
                        <ImageIcon style={{ color: '#4c1d95', width: '48px', height: '48px', marginBottom: '16px' }} />
                        <p style={{ color: '#FFF', margin: '0 0 8px 0' }}>Drag & drop an image here</p>
                        <p style={{ color: '#8b849c', fontSize: '12px', margin: 0 }}>Supports JPG, PNG (Max 10MB)</p>
                      </>
                    )}
                  </div>
                  
                  {/* API Trigger Button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={handleAnalyze}
                      disabled={!imageFile || isAnalyzing}
                      style={{
                        padding: '10px 24px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: !imageFile || isAnalyzing ? 'not-allowed' : 'pointer',
                        backgroundColor: !imageFile ? '#2d1f4a' : '#8b5cf6', color: !imageFile ? '#8b849c' : '#FFF',
                        display: 'flex', alignItems: 'center', gap: '8px'
                      }}
                    >
                      {isAnalyzing ? <><Loader2 className="animate-spin" size={18} /> Analyzing...</> : '✨ Analyze Image'}
                    </button>
                  </div>
                </div>

                {/* Dynamic Actions Panel */}
                <div style={{ width: '350px', backgroundColor: '#070310', borderRadius: '12px', padding: '20px', border: '1px solid #2d1f4a' }}>
                  <p style={{ color: '#8b849c', fontSize: '14px', margin: '0 0 16px 0' }}>Recommended Actions</p>
                  
                  {analysisResult?.actions ? (
                    analysisResult.actions.map((act: any, idx: number) => (
                      <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '12px', padding: '12px', backgroundColor: '#160d2b', borderRadius: '8px' }}>
                        <Leaf color="#22c55e" />
                        <div>
                          <p style={{ margin: 0, color: '#FFF', fontSize: '14px' }}>{act.action}</p>
                          <p style={{ margin: 0, color: '#8b849c', fontSize: '12px' }}>{act.details}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', padding: '12px', backgroundColor: '#160d2b', borderRadius: '8px' }}>
                        <Leaf color="#22c55e" />
                        <div>
                          <p style={{ margin: 0, color: '#FFF', fontSize: '14px' }}>Apply Fungicide</p>
                          <p style={{ margin: 0, color: '#8b849c', fontSize: '12px' }}>Propiconazole 25% EC</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: '#160d2b', borderRadius: '8px' }}>
                        <Droplets color="#3b82f6" />
                        <div>
                          <p style={{ margin: 0, color: '#FFF', fontSize: '14px' }}>Manage Irrigation</p>
                          <p style={{ margin: 0, color: '#8b849c', fontSize: '12px' }}>Maintain moderate moisture</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>

             </div>
          </div>
          
        </main>
      </div>
    </div>
  );
}