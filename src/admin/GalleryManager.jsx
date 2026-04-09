import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Maximize2, 
  X, 
  Upload,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const GalleryManager = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImg, setSelectedImg] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    
    // Upload Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newImageData, setNewImageData] = useState({ alt: '', category: 'General' });
    const [previewUrl, setPreviewUrl] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const API_URL = 'http://localhost:3000/api/gallery';

    const categories = [
        'All', 'Annual Function', 'Competition', 'Sports', 'Yoga', 
        'Campus Life', 'Student Activities', 'Training', 'PTA', 
        'Teacher Picnic', 'Republic Day', 'General'
    ];

    const fetchImages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setImages(data || []);
        } catch (error) {
            console.error("Failed to fetch images:", error);
            addNotification('Failed to load gallery from website', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const saveImages = async (updatedImages) => {
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ images: updatedImages })
            });
            const result = await res.json();
            if (!res.ok) throw new Error('Failed to save');
            setImages(result.images || updatedImages);
            return true;
        } catch (error) {
            console.error("Save failed:", error);
            addNotification('Failed to sync changes with website', 'error');
            return false;
        }
    };

    const addNotification = (message, type = 'success') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 3000);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this image from the live website?')) return;
        
        const updated = images.filter(img => img.id !== id);
        const success = await saveImages(updated);
        if (success) {
            addNotification('Image removed from website', 'success');
        }
    };

    const triggerFileSelect = () => {
        document.getElementById('gallery-file-input').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setNewImageData({ ...newImageData, alt: file.name.split('.')[0] });
            setIsModalOpen(true);
        }
    };

    const handlePublish = async () => {
        setIsUploading(true);
        
        try {
            // Important: Fetch latest images before saving to avoid overwriting
            const res = await fetch(API_URL);
            const latestData = await res.json();
            const currentImages = Array.isArray(latestData) ? latestData : [];

            // Get the file from the input
            const file = document.getElementById('gallery-file-input').files[0];
            const reader = new FileReader();
            
            reader.onloadend = async () => {
                const base64String = reader.result;
                
                const newImg = {
                    id: Date.now(),
                    src: base64String, // Send full base64 to API
                    alt: newImageData.alt || 'New School Memory',
                    category: newImageData.category || 'General'
                };

                const updated = [newImg, ...currentImages];
                const success = await saveImages(updated);
                
                setIsUploading(false);
                if (success) {
                    setIsModalOpen(false);
                    setPreviewUrl('');
                    setNewImageData({ alt: '', category: 'General' });
                    addNotification('New image published to website gallery');
                }
            };
            
            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Upload failed:", error);
            setIsUploading(false);
            addNotification('Upload failed', 'error');
        }
    };

    const filteredImages = filterCategory === 'All' 
        ? images 
        : images.filter(img => img.category === filterCategory);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <RefreshCw className="w-12 h-12 text-sky-600 animate-spin" />
                <p className="text-slate-500 font-bold animate-pulse text-lg uppercase tracking-widest text-center">
                    Syncing Data...<br/>
                    <span className="text-[10px] text-slate-400 capitalize font-medium">Restoring gallery records</span>
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 animate-in fade-in duration-500 pb-20">
            {/* Hidden Input */}
            <input 
                type="file" 
                id="gallery-file-input" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
            />

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">Database Optimized</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Gallery Management</h2>
                    <p className="text-slate-500 font-medium">Browse, filter, and manage school media with instant deployment.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={fetchImages}
                        className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-600 rounded-2xl hover:bg-slate-200 transition-colors"
                        title="Refresh List"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <button 
                        onClick={triggerFileSelect}
                        disabled={isUploading}
                        className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-sky-100 transition-all active:scale-95 disabled:opacity-70 group border-b-4 border-sky-800"
                    >
                        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                        ADD NEW MEDIA
                    </button>
                </div>
            </div>

            {/* Filtering & Stats */}
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Stats Summary */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="bg-sky-50 dark:bg-sky-900/20 p-4 rounded-2xl text-sky-600"><ImageIcon size={24} /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Images</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{images.length}</p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl text-emerald-600"><CheckCircle2 size={24} /></div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</p>
                            <p className="text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{filterCategory}</p>
                        </div>
                    </div>
                </div>

                {/* Filter Controls */}
                <div className="lg:w-1/3 bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2 block">Quick Filter by Category</label>
                    <div className="relative">
                        <select 
                            className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white focus:border-sky-500 transition-all outline-none cursor-pointer appearance-none shadow-inner"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat} {cat !== 'All' ? `(${images.filter(i => i.category === cat).length})` : ''}</option>
                            ))}
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <Maximize2 size={16} className="rotate-45" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages.map((img) => (
                    <div 
                        key={img.id} 
                        className="group relative bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                        <div className="aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800">
                            <img 
                                src={img.src && img.src.startsWith('/') ? `http://localhost:3000${img.src}` : img.src} 
                                alt={img.alt} 
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop';
                                }}
                            />
                        </div>

                        {/* Top Actions - ALWAYS VISIBLE NOW */}
                        <div className="absolute inset-x-4 top-4 flex justify-between items-start">
                            <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black text-slate-900 uppercase tracking-widest border border-white/50 shadow-lg">
                                {img.category}
                            </span>
                            <button 
                                onClick={() => handleDelete(img.id)}
                                className="flex items-center gap-1.5 px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 border-b-4 border-rose-800"
                                title="Delete from Website"
                            >
                                <Trash2 size={14} />
                                <span className="text-[10px] font-black uppercase">Delete</span>
                            </button>
                        </div>

                        <div className="p-6">
                            <h4 className="font-bold text-slate-900 dark:text-white truncate text-lg" title={img.alt}>{img.alt || 'Untitled Media'}</h4>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg">ID: {img.id.toString().slice(-4)}</span>
                                <button 
                                    onClick={() => setSelectedImg(img)}
                                    className="text-sky-600 hover:text-sky-700 font-bold text-xs flex items-center gap-1 group/btn"
                                >
                                    Preview <Maximize2 size={10} className="group-hover/btn:scale-125 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Constant Add Card */}
                <button 
                    onClick={triggerFileSelect}
                    className="aspect-square border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-400 hover:text-sky-600 hover:border-sky-600 hover:bg-sky-50 transition-all group"
                >
                    <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-[2rem] group-hover:bg-sky-100 transition-colors shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 duration-300 border border-slate-100 dark:border-slate-700">
                        <Plus size={48} className="group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                    <span className="font-black text-[10px] uppercase tracking-[0.3em] group-hover:text-sky-700">Add New Photo</span>
                </button>
            </div>

            {/* Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden animate-in zoom-in slide-in-from-bottom-10 duration-500 border border-white/20">
                        {/* Modal Header */}
                        <div className="bg-slate-50 dark:bg-slate-800/50 px-10 py-8 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                                <span className="p-2.5 bg-sky-100 dark:bg-sky-900/30 rounded-2xl text-sky-600"><Upload size={24} /></span>
                                Upload Details
                            </h3>
                            <p className="text-slate-500 mt-1 font-medium">Verify image and set metadata before publishing.</p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-10 space-y-8">
                            {/* Preview */}
                            <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-inner">
                                <img src={previewUrl} className="w-full h-full object-cover" alt="Preview" />
                                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-white/10">Image Preview</div>
                            </div>

                            <div className="grid gap-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Image Description / Title</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ex: Annual Sports Meet 2024"
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white placeholder:text-slate-300 focus:border-sky-500 focus:ring-4 ring-sky-50 dark:ring-sky-900/10 transition-all outline-none"
                                        value={newImageData.alt}
                                        onChange={(e) => setNewImageData({...newImageData, alt: e.target.value})}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">Gallery Category</label>
                                    <select 
                                        className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white focus:border-sky-500 transition-all outline-none cursor-pointer appearance-none"
                                        value={newImageData.category}
                                        onChange={(e) => setNewImageData({...newImageData, category: e.target.value})}
                                    >
                                        <option value="Annual Function">Annual Function</option>
                                        <option value="Competition">Competition</option>
                                        <option value="Sports">Sports Day</option>
                                        <option value="Yoga">Yoga Day</option>
                                        <option value="Campus Life">Campus Life</option>
                                        <option value="Student Activities">Student Activities</option>
                                        <option value="Training">Teacher Training</option>
                                        <option value="PTA">PTA Meeting</option>
                                        <option value="Teacher Picnic">Teacher Picnic</option>
                                        <option value="Republic Day">Republic Day</option>
                                        <option value="General">General Events</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-10 py-8 bg-slate-50 dark:bg-slate-800/50 flex gap-4 border-t border-slate-100 dark:border-slate-800">
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="flex-1 bg-white dark:bg-slate-900 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
                            >
                                CANCEL
                            </button>
                            <button 
                                onClick={handlePublish}
                                disabled={isUploading || !newImageData.alt}
                                className="flex-[2] bg-sky-600 hover:bg-sky-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-sky-100 transition-all active:scale-95 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
                            >
                                {isUploading ? (
                                    <>
                                        <RefreshCw className="animate-spin" size={20} />
                                        SYNCING...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={20} />
                                        PUBLISH TO WEBSITE
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lightbox */}
            {selectedImg && (
                <div className="fixed inset-0 z-[150] bg-slate-950/98 flex items-center justify-center p-4 sm:p-20 animate-in fade-in duration-300">
                    <button 
                        onClick={() => setSelectedImg(null)}
                        className="absolute top-10 right-10 p-5 bg-white/10 hover:bg-white/20 text-white rounded-[1.5rem] transition-colors shadow-2xl backdrop-blur-md"
                    >
                        <X size={28} />
                    </button>
                    <div className="max-w-7xl w-full h-full flex flex-col items-center justify-center gap-8">
                        <img 
                            src={selectedImg.src} 
                            alt={selectedImg.alt} 
                            className="max-h-[80%] max-w-full rounded-[2rem] shadow-2xl object-contain border border-white/10"
                        />
                        <div className="text-center">
                            <span className="bg-sky-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg shadow-sky-500/20">{selectedImg.category}</span>
                            <h3 className="text-4xl font-black text-white mt-6 tracking-tight">{selectedImg.alt}</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications */}
            <div className="fixed bottom-10 right-10 z-[200] flex flex-col gap-3">
                {notifications.map(n => (
                    <div 
                        key={n.id} 
                        className={`flex items-center gap-4 px-8 py-5 rounded-[1.8rem] shadow-2xl text-white font-black text-xs animate-in slide-in-from-right duration-500 border-l-8 ${
                            n.type === 'success' ? 'bg-emerald-600 border-emerald-400' : 'bg-rose-600 border-rose-400'
                        }`}
                    >
                        {n.type === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
                        {n.message.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GalleryManager;
