import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MaterialIcon from '../components/ui/MaterialIcon';

export default function ReportIssue() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalSteps = 4;

  // AI Scanner & 3D Tilt Card States (Steps 9 & 10)
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [scanLog, setScanLog] = useState('Ready for analysis...');
  const [tiltStyle, setTiltStyle] = useState({});

  const triggerScan = (imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYt1ZUhZM9jfCi_E-JP-o-0xAK2G_O4mS8hnms5s2grfDniY2odlx4B0DkkVQe_vqwCvy3UnJpgS49UWd5Vs7A-td_jnWCQn-pFKu9s6XRI7v7AANO40VMe3XpcckHLuC7bJldWSdJ7EbramBn2MPeqhTx8xED8axuAser3bpiz6DR_KiT0MCk3SxCP4dpx8GBCI_50FikHm-9pCALIqdaW6GPkJwYlsM9V3fBT8MaqB1SGT-r9-hKUAe67X1MIlJej9g7Lr5Roe5e') => {
    setUploadedImage(imageUrl);
    setIsScanning(true);
    setIsScanned(false);
    setScanLog('Neural processor online...');

    // Progress logs
    setTimeout(() => setScanLog('Analyzing topological patterns...'), 700);
    setTimeout(() => setScanLog('Detecting structural fractures...'), 1400);
    setTimeout(() => {
      setIsScanning(false);
      setIsScanned(true);
      setScanLog('Scan complete: Municipal Anomaly Identified.');
    }, 2500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      triggerScan(url);
    }
  };

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    
    // Rotate coordinates
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = -(y - centerY) / 8;
    const rotateY = (x - centerX) / 8;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.05s ease',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease',
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    else setShowSuccess(true);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const goToStep = (step) => {
    if (step <= currentStep || step === currentStep + 1) setCurrentStep(step);
  };

  const stepLabels = ['Media', 'Location', 'Details', 'Confirm'];

  return (
    <main className="min-h-screen bg-[#F8FAFC] relative overflow-y-auto">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-primary-container)]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 bg-[var(--color-secondary-container)]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-[var(--spacing-margin-desktop)] py-12 relative z-10">
        {/* Header & Stepper */}
        <header className="text-center mb-12">
          <h2 className="text-headline-md text-[var(--color-on-surface)] mb-8">Report Urban Issue</h2>
          <div className="flex items-center justify-center gap-4">
            {stepLabels.map((label, i) => {
              const step = i + 1;
              const isCompleted = step < currentStep;
              const isActive = step === currentStep;
              return (
                <div key={step} className="flex items-center gap-2">
                  {i > 0 && <div className="w-12 h-[2px] bg-[var(--color-outline-variant)]/30"></div>}
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => goToStep(step)}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all ${
                      isCompleted ? 'bg-[var(--color-primary-container)]/10 border-[var(--color-primary-container)] text-[var(--color-primary)]' :
                      isActive ? 'bg-[var(--color-primary)] border-[var(--color-primary)] text-white' :
                      'border-[var(--color-outline-variant)] text-[var(--color-on-surface-variant)]'
                    }`}>
                      {isCompleted ? <MaterialIcon icon="check" className="text-[20px]" /> : step}
                    </div>
                    <span className={`text-label-md ${isActive || isCompleted ? 'text-[var(--color-primary)]' : 'text-[var(--color-on-surface-variant)]'}`}>{label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </header>

        {/* Form Container */}
        <div className="glass-card p-10 min-h-[500px] transition-all duration-500">
          <AnimatePresence mode="wait">
            {/* Step 1: Media Upload */}
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="text-center mb-8">
                  <h3 className="text-headline-sm mb-2">Upload Visual Evidence</h3>
                  <p className="text-body-md text-[var(--color-on-surface-variant)]">AI will automatically analyze the image to categorize the issue.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column: File Drop area */}
                  <label className="border-2 border-dashed border-[var(--color-outline-variant)]/50 rounded-2xl p-8 flex flex-col items-center justify-center bg-[var(--color-surface)]/50 hover:bg-[var(--color-surface-container-low)] hover:border-[var(--color-primary)] transition-all cursor-pointer group h-72">
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <div className="w-16 h-16 bg-[var(--color-primary-container)]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MaterialIcon icon="cloud_upload" className="text-[var(--color-primary)] text-[32px]" />
                    </div>
                    <p className="text-label-md text-[var(--color-on-surface)] mb-1">Click to select image</p>
                    <p className="text-label-sm text-[var(--color-on-surface-variant)]">Supported formats: JPG, PNG, HEIC</p>
                    <button 
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); triggerScan(); }}
                      className="mt-4 px-4 py-2 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-bold hover:bg-[var(--color-primary)]/20 transition-all"
                    >
                      Simulate Scanner
                    </button>
                  </label>

                  {/* Right Column: AI Scanner & 3D Floating Perspective Image Card (Steps 9 & 10) */}
                  <div className="flex flex-col gap-4">
                    {uploadedImage ? (
                      <div 
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={tiltStyle}
                        className="relative rounded-2xl overflow-hidden h-72 shadow-2xl cursor-pointer group bg-black"
                      >
                        {/* The uploaded image mesh */}
                        <img 
                          className={`w-full h-full object-cover transition-opacity duration-300 ${isScanning ? 'opacity-65' : 'opacity-80'}`} 
                          src={uploadedImage} 
                          alt="Visual Anomaly Scan" 
                        />
                        
                        {/* Dynamic Glare Overlay Effect */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        {/* AI Laser Scanline Sweep (Step 9) */}
                        {isScanning && (
                          <div className="absolute left-0 w-full h-1 bg-[#06b6d4] shadow-[0_0_10px_#06b6d4] animate-laser-sweep pointer-events-none z-10"></div>
                        )}

                        {/* Scanning Progress Logs / Overlay */}
                        {isScanning && (
                          <div className="absolute inset-0 bg-[#070b19]/75 flex flex-col items-center justify-center p-6 text-center text-white z-20">
                            <div className="w-10 h-10 border-4 border-[#06b6d4] border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-xs font-mono text-[#06b6d4] tracking-widest uppercase mb-1">AI Diagnostics Active</p>
                            <p className="text-[11px] font-mono text-[#94a3b8]">{scanLog}</p>
                          </div>
                        )}

                        {/* Scan Complete Anomaly Detected Card (Step 9) */}
                        {isScanned && (
                          <div className="absolute inset-0 bg-gradient-to-t from-[#070b19]/90 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                            <div className="flex justify-between items-end">
                              <div>
                                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-black uppercase tracking-wider">
                                  Anomaly Identified
                                </span>
                                <h4 className="text-lg font-black mt-1 text-[#e2e8f0]">Detected: Pothole</h4>
                                <p className="text-[10px] text-[#94a3b8] mt-0.5">Est. Repair Window: 24 hrs</p>
                              </div>
                              <div className="bg-[#10b981]/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-[#10b981]/20">
                                <MaterialIcon icon="auto_awesome" filled className="text-[12px] text-white" />
                                <span className="text-[10px] font-black text-white">92%</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="border border-dashed border-[var(--color-outline-variant)]/30 rounded-2xl h-72 flex flex-col items-center justify-center text-center p-6 bg-slate-50 text-[var(--color-on-surface-variant)]/40">
                        <MaterialIcon icon="image" className="text-5xl mb-2" />
                        <p className="text-label-sm">Scanner standby. Upload media to activate AI.</p>
                      </div>
                    )}
                  </div>
                  
                </div>
              </motion.div>
            )}

            {/* Step 2: Location */}
            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="text-center mb-8">
                  <h3 className="text-headline-sm mb-2">Pinpoint the Location</h3>
                  <p className="text-body-md text-[var(--color-on-surface-variant)]">Help us find exactly where the issue is occurring.</p>
                </div>
                <div className="space-y-6">
                  <div className="relative h-64 bg-[var(--color-surface-variant)] rounded-2xl overflow-hidden border border-[var(--color-outline-variant)]/30">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGB98xTiXv2R_Jj3aooFtXEjfbbzmClz4XesehBk49JpGtGCgdVhbHRcQVkIKLwZRD0a1z-mBprX9bqZqCF0GgAUXpIjLetDAMgD6dvgcyWjo8_x4p4KFBK58QbpkqjEgbXlwdGZwUEMP46W_rUN2ESsHuXacSgnmHXXkO2A-isHOQBNRWgQph957NhcTh8iQAuFJdatLRXX3JXsNzd05DT5fNfvja_JESbhMoCYYzcLE3WrKF6OdCctOEeX24HkATOA9f8QVoOe-F')` }}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-12 h-12 bg-[var(--color-primary)]/20 rounded-full pulse-marker"></div>
                        <div className="w-4 h-4 bg-[var(--color-primary)] border-2 border-white rounded-full shadow-lg z-10"></div>
                      </div>
                      <div className="mt-2 bg-white px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold border border-[var(--color-outline-variant)]/20 whitespace-nowrap">325 MARKET ST, SF</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 relative">
                      <MaterialIcon icon="location_on" className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-on-surface-variant)]" />
                      <input className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[var(--color-outline-variant)]/30 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] bg-[var(--color-surface)]/50 text-body-md" type="text" defaultValue="325 Market St, San Francisco, CA 94105" />
                    </div>
                    <button className="bg-[var(--color-secondary-container)]/20 text-[var(--color-on-secondary-container)] px-4 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[var(--color-secondary-container)]/40 transition-colors">
                      <MaterialIcon icon="my_location" />
                      <span className="text-label-md">Auto-detect</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="text-center mb-8">
                  <h3 className="text-headline-sm mb-2">Provide Further Details</h3>
                  <p className="text-body-md text-[var(--color-on-surface-variant)]">Add a description and set the priority level.</p>
                </div>
                <div className="space-y-8">
                  <div>
                    <label className="block text-label-md font-bold mb-4 text-[var(--color-on-surface-variant)]">Issue Category</label>
                    <div className="flex flex-wrap gap-3">
                      {['Pothole', 'Lighting', 'Waste', 'Water/Leak', 'Graffiti'].map((cat) => (
                        <button key={cat} className={`px-5 py-2.5 rounded-full text-label-md transition-all ${cat === 'Lighting' ? 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-primary)]/5 font-bold' : 'border border-[var(--color-outline-variant)]/50 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] bg-white'}`}>
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-label-md font-bold mb-4 text-[var(--color-on-surface-variant)]">Priority Level</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[{ label: 'Low', color: 'bg-blue-400' }, { label: 'Medium', color: 'bg-[var(--color-primary)]', active: true }, { label: 'High', color: 'bg-orange-500' }, { label: 'Emergency', color: 'bg-[var(--color-error)]' }].map((p) => (
                        <button key={p.label} className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${p.active ? 'border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border border-[var(--color-outline-variant)]/30 hover:bg-[var(--color-surface-container-low)]'}`}>
                          <div className={`w-2.5 h-2.5 rounded-full ${p.color}`}></div>
                          <span className={`text-label-md ${p.active ? 'font-bold' : ''}`}>{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-label-md font-bold mb-4 text-[var(--color-on-surface-variant)]">Description</label>
                    <textarea className="w-full px-4 py-4 rounded-2xl border border-[var(--color-outline-variant)]/30 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)] bg-[var(--color-surface)]/50 text-body-md placeholder:text-[var(--color-on-surface-variant)]/40" placeholder="Please describe the issue in detail..." rows="4"></textarea>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirm */}
            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="text-center mb-10">
                  <h3 className="text-headline-sm mb-2">Review & Confirm</h3>
                  <p className="text-body-md text-[var(--color-on-surface-variant)]">Verify the details before sending the report.</p>
                </div>
                <div className="bg-[var(--color-surface)]/50 rounded-2xl p-6 border border-[var(--color-outline-variant)]/30 space-y-6">
                  {[{ label: 'Category', value: 'Infrastructure (Lighting)', valueClass: 'font-bold text-[var(--color-primary)]' },
                    { label: 'Location', value: '325 Market St, SF', valueClass: 'font-bold' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between pb-4 border-b border-[var(--color-outline-variant)]/20">
                      <span className="text-[var(--color-on-surface-variant)] text-label-md">{row.label}</span>
                      <span className={row.valueClass}>{row.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--color-outline-variant)]/20">
                    <span className="text-[var(--color-on-surface-variant)] text-label-md">Priority</span>
                    <div className="flex items-center gap-2 font-bold">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-primary)]"></div><span>Medium</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[var(--color-on-surface-variant)] text-label-md mb-2">Description Preview</span>
                    <p className="text-body-md italic text-[var(--color-on-surface)]/80">"The streetlight at the corner of Market and Fremont has been flickering for three nights, creating a dark spot in a high-traffic pedestrian area..."</p>
                  </div>
                </div>
                <div className="mt-10 flex items-center justify-center">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-[var(--color-outline-variant)]/50 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" type="checkbox" />
                    <span className="text-label-md text-[var(--color-on-surface-variant)] group-hover:text-[var(--color-on-surface)] transition-colors">I confirm that the provided information is accurate.</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <button className={`px-8 py-3 rounded-2xl font-bold text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-container-low)] transition-all flex items-center gap-2 ${currentStep === 1 ? 'invisible' : ''}`} onClick={prevStep}>
              <MaterialIcon icon="arrow_back" /><span>Back</span>
            </button>
            <button className={`px-10 py-4 rounded-2xl font-bold text-white btn-glow transition-all flex items-center gap-2 ${currentStep === totalSteps ? 'bg-[var(--color-primary-container)]' : 'bg-[var(--color-primary)]'}`} onClick={nextStep}>
              <span>{currentStep === totalSteps ? 'Submit Report' : 'Next Step'}</span>
              <MaterialIcon icon={currentStep === totalSteps ? 'send' : 'arrow_forward'} />
            </button>
          </div>
        </div>
      </div>

      {/* Success State */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-background)]/95 backdrop-blur-xl">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-sm px-6">
              <div className="w-24 h-24 bg-[var(--color-primary)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[var(--color-primary)]/40 relative">
                <MaterialIcon icon="check" className="text-white text-[48px] animate-bounce" />
                <div className="absolute -top-4 -right-4 w-4 h-4 bg-[var(--color-secondary-container)] rounded-full opacity-50"></div>
                <div className="absolute bottom-2 -left-6 w-3 h-3 bg-[var(--color-primary-container)] rounded-full opacity-50"></div>
              </div>
              <h2 className="text-headline-md mb-4">Report Submitted!</h2>
              <p className="text-body-md text-[var(--color-on-surface-variant)] mb-8">Your report has been successfully filed with the City Services department.</p>
              <div className="bg-[var(--color-surface-container)] rounded-xl p-4 mb-10">
                <p className="text-label-sm text-[var(--color-on-surface-variant)] mb-1 uppercase tracking-wider">Reference ID</p>
                <p className="font-mono text-xl font-bold text-[var(--color-primary)]">#CP-990214-X</p>
              </div>
              <button className="w-full bg-[var(--color-primary)] text-white py-4 rounded-2xl font-bold btn-glow transition-all" onClick={() => { setShowSuccess(false); setCurrentStep(1); }}>
                Back to Dashboard
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
