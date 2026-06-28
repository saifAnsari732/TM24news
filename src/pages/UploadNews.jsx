import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bold, Italic, Underline, Highlighter, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, Image as ImageIcon, Video, 
  UploadCloud, Eye, Save, Heading, Plus, Settings, AlertCircle, CheckCircle, Info, Globe, Palette, FileText, Send, Lock, Link as LinkIcon, Quote
} from 'lucide-react';
import { NewsContext } from '../context/NewsContext';
import { API_BASE_URL, IMAGEKIT_AUTH_URL } from '../services/api';
import { indianStatesAndCities } from '../data/locations';

export default function UploadNews() {
  const { addArticle, setIsAdminLoggedIn } = useContext(NewsContext);
  const navigate = useNavigate();

  // Password protection state
  const [password, setPassword] = useState('');
  const [passError, setPassError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsAdminLoggedIn(isAuthorized);
    return () => {
      setIsAdminLoggedIn(false);
    };
  }, [isAuthorized, setIsAdminLoggedIn]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    if (password === 'tm24admin') {
      setIsAuthorized(true);
      setPassError('');
    } else {
      setPassError('Incorrect password! Please enter the correct admin password.');
    }
  };

  // Refs for contentEditable containers
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const editorRef = useRef(null);

  // States (for preview and form submissions)
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Main News');
  const [author, setAuthor] = useState('Editor');
  const [description, setDescription] = useState('');
  const [newsType, setNewsType] = useState('text'); // text or video
  const [mediaUrl, setMediaUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [editorContent, setEditorContent] = useState('');
  
  // New State variables
  const [selectedState, setSelectedState] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState([]);
  const [keywords, setKeywords] = useState('');
  const [sourceLink, setSourceLink] = useState('');

  // Drafts list state
  const [drafts, setDrafts] = useState([]);
  const [draftsLoading, setDraftsLoading] = useState(false);
  const [draftsError, setDraftsError] = useState('');

  // Tracks which editor is currently active: 'title' | 'description' | 'content'
  const [activeField, setActiveField] = useState('content');

  // Draft vs Publish Workflow States
  const [saveStatus, setSaveStatus] = useState('unsaved'); 
  const [savedArticleId, setSavedArticleId] = useState(null);
  const [isDbLoading, setIsDbLoading] = useState(false);
  const [dbError, setDbError] = useState('');

  // Server URL Configuration
  const [backendUrl, setBackendUrl] = useState(API_BASE_URL);
  const [useSimulation, setUseSimulation] = useState(false); // Default to live database server first

  // ImageKit states
  const [ikPublicKey, setIkPublicKey] = useState('public_42PJ3Dfu5r83X7iIyJ3F8qthmcM=');
  const [ikUrlEndpoint, setIkUrlEndpoint] = useState('https://ik.imagekit.io/4eqyb4rwe');
  const [ikAuthEndpoint, setIkAuthEndpoint] = useState(IMAGEKIT_AUTH_URL);
  const [showConfig, setShowConfig] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Preview Mode state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Color Pickers Popover States
  const [showTextColorPicker, setShowTextColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const categories = [
    "Main News", "Politics", "Business", "Sports", "Technology", 
    "Science", "Entertainment", "Health", "World News", 
    "National - प्रNational", "Environment", "Other"
  ];

  // Presets text colors
  const textColors = [
    { name: 'Default', value: '#18181b', hex: 'bg-zinc-800' },
    { name: 'Black', value: '#000000', hex: 'bg-black' },
    { name: 'White', value: '#ffffff', hex: 'bg-white border border-zinc-200' },
    { name: 'Gray', value: '#6b7280', hex: 'bg-gray-500' },
    { name: 'Red', value: '#ac0202', hex: 'bg-[#ac0202]' },
    { name: 'Blue', value: '#002698', hex: 'bg-[#002698]' },
    { name: 'Green', value: '#16a34a', hex: 'bg-green-600' },
    { name: 'Orange', value: '#ea580c', hex: 'bg-orange-600' },
    { name: 'Yellow', value: '#eab308', hex: 'bg-yellow-500' },
    { name: 'Pink', value: '#db2777', hex: 'bg-pink-600' },
    { name: 'Purple', value: '#7e22ce', hex: 'bg-purple-700' },
    { name: 'Teal', value: '#0f766e', hex: 'bg-teal-700' }
  ];

  // Presets background/highlight colors
  const bgColors = [
    { name: 'None', value: 'transparent', hex: 'bg-white border border-zinc-300' },
    { name: 'Yellow', value: '#fef08a', hex: 'bg-yellow-200' },
    { name: 'Green', value: '#bbf7d0', hex: 'bg-green-200' },
    { name: 'Blue', value: '#bfdbfe', hex: 'bg-blue-200' },
    { name: 'Red', value: '#fecaca', hex: 'bg-red-200' },
    { name: 'Orange', value: '#ffedd5', hex: 'bg-orange-100' },
    { name: 'Purple', value: '#e9d5ff', hex: 'bg-purple-200' },
    { name: 'Pink', value: '#fbcfe8', hex: 'bg-pink-200' },
    { name: 'Gray', value: '#e5e7eb', hex: 'bg-gray-200' },
    { name: 'Black', value: '#000000', hex: 'bg-black' }
  ];

  // Load configuration from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('tm24_imagekit_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        setIkPublicKey(parsed.publicKey || '');
        setIkUrlEndpoint(parsed.urlEndpoint || '');
        setIkAuthEndpoint(parsed.authEndpoint || '');
      } catch (e) {
        console.error("Failed to parse ImageKit config", e);
      }
    }
    const savedBackend = localStorage.getItem('tm24_backend_url');
    // if (savedBackend) {
    //   setBackendUrl(savedBackend);
    // }
    const savedSim = localStorage.getItem('tm24_use_simulation');
    if (savedSim !== null) {
      setUseSimulation(savedSim === 'true');
    }
  }, []);

  // Sync internal ref contents with states ONLY ON INITIAL MOUNT if we have defaults
  useEffect(() => {
    if (titleRef.current && titleRef.current.innerHTML !== title) {
      titleRef.current.innerHTML = title;
    }
    if (descriptionRef.current && descriptionRef.current.innerHTML !== description) {
      descriptionRef.current.innerHTML = description;
    }
    if (editorRef.current && editorRef.current.innerHTML !== editorContent) {
      editorRef.current.innerHTML = editorContent;
    }
  }, []);

  // Load drafts on mount or when simulation / backend URL changes
  useEffect(() => {
    fetchDrafts();
  }, [backendUrl, useSimulation]);

  // Fetch unpublished draft articles
  const fetchDrafts = async () => {
    setDraftsLoading(true);
    setDraftsError('');
    if (useSimulation) {
      // Simulation mode: Pull drafts from simulated cache in localStorage
      const localSim = JSON.parse(localStorage.getItem('tm24_simulated_db') || '[]');
      const unpublished = localSim.filter(item => item.published === false);
      setDrafts(unpublished);
      setDraftsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/news/drafts`);
      if (response.ok) {
        const data = await response.json();
        setDrafts(data);
      } else {
        const errMsg = `Failed to fetch drafts: Server returned status ${response.status}. Please verify if GET '/api/news/drafts' route is added to your Express backend.`;
        setDraftsError(errMsg);
        console.warn(errMsg);
      }
    } catch (err) {
      const errMsg = `Express drafts fetch failed: ${err.message}. Loading local simulation drafts as fallback...`;
      setDraftsError(errMsg);
      console.warn(errMsg);
      // Fallback to local storage simulated draft news
      const localSim = JSON.parse(localStorage.getItem('tm24_simulated_db') || '[]');
      const unpublished = localSim.filter(item => item.published === false);
      setDrafts(unpublished);
    } finally {
      setDraftsLoading(false);
    }
  };

  // Save config settings
  const saveConfig = () => {
    localStorage.setItem('tm24_imagekit_config', JSON.stringify({
      publicKey: ikPublicKey,
      urlEndpoint: ikUrlEndpoint,
      authEndpoint: ikAuthEndpoint
    }));
    localStorage.setItem('tm24_backend_url', backendUrl);
    localStorage.setItem('tm24_use_simulation', String(useSimulation));
    alert("Configuration settings saved successfully!");
    fetchDrafts();
  };

  // Rich text editor commands
  const handleEditorCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    
    // Sync contents depending on which field is being formatted
    if (activeField === 'title' && titleRef.current) {
      setTitle(titleRef.current.innerHTML);
    } else if (activeField === 'description' && descriptionRef.current) {
      setDescription(descriptionRef.current.innerHTML);
    } else if (activeField === 'content' && editorRef.current) {
      setEditorContent(editorRef.current.innerHTML);
    }
    setSaveStatus('unsaved');
  };

  const handleInsertLink = () => {
    const url = prompt("Please enter link URL:");
    if (url) {
      handleEditorCommand('createLink', url);
    }
  };

  const handleTitleInput = () => {
    if (titleRef.current) {
      setTitle(titleRef.current.innerHTML);
    }
    setSaveStatus('unsaved');
  };

  const handleDescriptionInput = () => {
    if (descriptionRef.current) {
      setDescription(descriptionRef.current.innerHTML);
    }
    setSaveStatus('unsaved');
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.innerHTML);
    }
    setSaveStatus('unsaved');
  };

  // Handle Image/Video Upload to ImageKit
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(20);
    setUploadError('');
    setUploadSuccess(false);

    if (!ikPublicKey || !ikUrlEndpoint || !ikAuthEndpoint) {
      setIsUploading(false);
      setUploadError("ImageKit credentials (Public Key, URL Endpoint, Auth Endpoint) are empty! Please 'API & ImageKit settings' go below and fill them so the file can be uploaded directly to ImageKit.");
      setShowConfig(true); 
      return;
    }

    try {
      setUploadProgress(40);
      const authRes = await fetch(ikAuthEndpoint);
      if (!authRes.ok) {
        throw new Error(`Auth Endpoint Error: ${authRes.status}`);
      }
      const authParams = await authRes.json();
      const { signature, token, expire } = authParams;

      setUploadProgress(70);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", ikPublicKey);
      formData.append("signature", signature);
      formData.append("token", token);
      formData.append("expire", expire);

      const response = await fetch(`https://upload.imagekit.io/api/v1/files/upload`, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorJson = await response.json();
        throw new Error(errorJson.message || "ImageKit upload failed");
      }

      const result = await response.json();
      setUploadProgress(100);
      setMediaUrl(result.url);
      setUploadSuccess(true);
      setSaveStatus('unsaved');
    } catch (err) {
      console.error(err);
      setUploadError(err.message || "अपलोड करने में त्रुटि हुई। कृपया settings जांचें।");
    } finally {
      setIsUploading(false);
    }
  };

  // Step 1: Save Draft to DB
  const handleSaveToDB = async (e) => {
    if (e) e.preventDefault();

    if (!title.trim() || title === '<br>') {
      alert("Please enter the news title!");
      return;
    }


    setIsDbLoading(true);
    setDbError('');

    const finalContent = editorContent.trim() || `<p>${description}</p>`;

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const formattedDate = `${dateObj.getDate()} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    const payload = {
      title: title.trim(),
      description: description.trim() || (editorContent.trim() ? editorContent.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' : title.trim()),
      content: editorContent.trim() || title.trim(),
      category,
      image: mediaUrl || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      author: author || "Editor",
      date: formattedDate,
      videoUrl: newsType === 'video' ? (videoUrl || mediaUrl) : '',
      location,
      tags,
      keywords,
      link: sourceLink
    };

    if (useSimulation) {
      setTimeout(() => {
        const mockId = `sim-db-${Date.now()}`;
        setSavedArticleId(mockId);
        setSaveStatus('draft');
        setIsDbLoading(false);
        
        const localSim = JSON.parse(localStorage.getItem('tm24_simulated_db') || '[]');
        const articleData = { ...payload, id: mockId, published: false, trending: true, breaking: true, isRichContent: true };
        localSim.unshift(articleData);
        localStorage.setItem('tm24_simulated_db', JSON.stringify(localSim));
        fetchDrafts();
      }, 1000);
      return;
    }

    try {
      const response = await fetch(`${backendUrl}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} - news draft could not be saved.`);
      }

      const result = await response.json();
      const newId = result.article?._id || result.article?.id || `db-${Date.now()}`;
      setSavedArticleId(newId);
      setSaveStatus('draft');
      fetchDrafts();
    } catch (err) {
      console.error(err);
      setDbError(err.message || 'Failed to connect to the database server. Is your node server running?');
    } finally {
      setIsDbLoading(false);
    }
  };

  // Step 2: Publish Draft Live
  const handlePublishLive = async () => {
    if (!savedArticleId) {
      alert("Please save the news as a Draft in the database first!");
      return;
    }
    await publishSingleDraft(savedArticleId);
    navigate('/');
  };

  // Unified Single Draft Publish Handler
  const publishSingleDraft = async (draftId) => {
    setIsDbLoading(true);
    setDbError('');

    const isSimDraft = String(draftId).startsWith('sim-db-');

    if (useSimulation || isSimDraft) {
      // Local simulated publish
      return new Promise((resolve) => {
        setTimeout(() => {
          const localSim = JSON.parse(localStorage.getItem('tm24_simulated_db') || '[]');
          const article = localSim.find(item => String(item.id) === String(draftId));
          if (article) {
            article.published = true;
            localStorage.setItem('tm24_simulated_db', JSON.stringify(localSim));
            addArticle(article);
          }
          setSaveStatus('published');
          setIsDbLoading(false);
          fetchDrafts();
          alert("Draft has been successfully published live on the website!");
          resolve();
        }, 800);
      });
    }

    try {
      const response = await fetch(`${backendUrl}/news/${draftId}/publish`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status} - News could not be published.`);
      }

      const result = await response.json();
      setSaveStatus('published');
      
      if (result.article) {
        const articleWithFormattedId = {
          ...result.article,
          id: result.article._id || result.article.id,
          isRichContent: true
        };
        addArticle(articleWithFormattedId);
      }
      fetchDrafts();
      alert("Congratulations! Your news has been published live from the database to the website.");
    } catch (err) {
      console.error(err);
      setDbError(err.message || 'Error during publishing. Please check server logs.');
    } finally {
      setIsDbLoading(false);
    }
  };

  // Load an existing draft back into the editor form to modify it
  const loadDraftIntoEditor = (article) => {
    setSavedArticleId(article._id || article.id);
    setSaveStatus('draft');

    setTitle(article.title);
    if (titleRef.current) titleRef.current.innerHTML = article.title;

    setDescription(article.description);
    if (descriptionRef.current) descriptionRef.current.innerHTML = article.description;

    setEditorContent(article.content);
    if (editorRef.current) editorRef.current.innerHTML = article.content;

    setCategory(article.category);
    setAuthor(article.author);
    setMediaUrl(article.image);
    setVideoUrl(article.videoUrl || '');
    setLocation(article.location || '');
    if (article.location) {
      const parts = article.location.split(', ');
      if (parts.length > 1) {
        const st = parts[1].trim();
        if (Object.keys(indianStatesAndCities).includes(st)) {
          setSelectedState(st);
        }
      }
    }
    setTags(article.tags || []);
    setKeywords(article.keywords || '');
    setSourceLink(article.link || '');
    if (article.videoUrl) {
      setNewsType('video');
    } else {
      setNewsType('text');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert("Draft loaded into the form editor. You can make changes and save or publish again!");
  };

  if (!isAuthorized) {
    return (
      <div className="bg-zinc-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-zinc-200 shadow-xl">
          <div className="text-center space-y-3">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-red/10 text-brand-red shadow-inner">
              <Lock className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-black text-brand-dark">
              Admin Login
            </h2>
            <p className="text-base text-zinc-500 font-bold">
              Please enter the admin password to upload news.
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleAuthSubmit}>
            <div className="rounded-2xl shadow-sm">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="appearance-none rounded-xl relative block w-full px-4 py-3.5 border border-zinc-200 placeholder-zinc-400 text-zinc-800 font-bold focus:outline-none focus:ring-brand-blue focus:border-brand-blue focus:z-10 text-base transition-all bg-zinc-50 focus:bg-white"
                />
              </div>
            </div>

            {passError && (
              <div className="bg-red-50 text-red-800 p-3.5 rounded-xl border border-red-100 text-xs font-bold flex items-center gap-2">
                <AlertCircle size={16} className="text-red-600 shrink-0" />
                <span>{passError}</span>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold py-3.5 px-4 rounded-xl text-base transition-all cursor-pointer text-center"
              >
                Back to Homepage
              </button>
              
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-brand-red to-brand-blue hover:from-brand-red-dark hover:to-brand-blue-dark text-white font-bold py-3.5 px-4 rounded-xl text-base shadow-md hover:shadow-lg transition-all cursor-pointer text-center active:scale-95"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-[1500px] space-y-10">
        
        {/* Status bar */}
        <div className="bg-white px-6 py-4 rounded-2xl border border-zinc-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-zinc-600 font-bold text-base">Publication Status:</span>
            {saveStatus === 'unsaved' && (
              <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Not Saved
              </span>
            )}
            {saveStatus === 'draft' && (
              <span className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Database Draft
              </span>
            )}
            {saveStatus === 'published' && (
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                Live Published
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPreviewOpen(!isPreviewOpen)}
              className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-bold px-4 py-2 rounded-xl transition-all cursor-pointer text-xs"
            >
              <Eye size={16} />
              <span>{isPreviewOpen ? 'Edit' : 'View Live Preview'}</span>
            </button>
            
            {/* Step 1: Save Draft */}
            <button
              onClick={handleSaveToDB}
              disabled={isDbLoading || saveStatus === 'draft'}
              className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl shadow transition-all cursor-pointer text-xs ${
                saveStatus === 'draft' 
                  ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed shadow-none' 
                  : 'bg-zinc-800 hover:bg-black text-white active:scale-95'
              }`}
            >
              <Save size={16} />
              <span>{isDbLoading && saveStatus === 'unsaved' ? 'Saving...' : '1. Save to DB (Draft)'}</span>
            </button>

            {/* Step 2: Publish Live */}
            <button
              onClick={handlePublishLive}
              disabled={isDbLoading || saveStatus !== 'draft'}
              className={`flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-xs ${
                saveStatus === 'draft'
                  ? 'bg-gradient-to-r from-brand-red to-brand-blue hover:shadow-xl text-white hover:scale-105 active:scale-95'
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Globe size={16} />
              <span>{isDbLoading && saveStatus === 'draft' ? 'Publishing...' : '2. Publish Live'}</span>
            </button>
          </div>
        </div>

        {dbError && (
          <div className="bg-red-50 text-red-900 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="text-red-600 w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-base">Error (Database Error):</p>
              <p className="text-xs font-semibold mt-1">{dbError}</p>
              <p className="text-xs font-medium text-zinc-500 mt-2">
                * यदि आपके पास बैकएंड सर्वर रनिंग नहीं है, तो Please दिए गए "API Configuration" settings में जाकर **Simulation Mode** चालू करें ताकि आप बिना एरर के परीक्षण कर सकें।
              </p>
            </div>
          </div>
        )}

        {isPreviewOpen ? (
          /* Live Preview Mode */
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-zinc-200 shadow-xl animate-fadeIn">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <span className="inline-block bg-gradient-to-r from-brand-red to-brand-red-dark text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                  {category}
                </span>
                <h1 className="text-2xl md:text-4xl font-black text-brand-dark mb-4 leading-tight">
                  {title ? <span dangerouslySetInnerHTML={{ __html: title }} /> : 'Untitled News'}
                </h1>
                <div className="flex items-center gap-6 text-zinc-500 text-base font-medium pb-4 border-b border-zinc-200">
                  <span>Author: {author || 'Editor'}</span>
                  <span>Date: Today</span>
                </div>
              </div>

              {/* Media Container */}
              <div className="rounded-2xl overflow-hidden mb-6 shadow-md max-h-[450px] bg-zinc-900 flex justify-center items-center">
                {newsType === 'video' ? (
                  <video 
                    src={videoUrl || mediaUrl || 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'} 
                    controls 
                    className="w-full max-h-[450px] object-contain"
                  />
                ) : (
                  <img 
                    src={mediaUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80'} 
                    alt="Cover" 
                    className="w-full object-cover max-h-[450px]" 
                  />
                )}
              </div>

              {/* Body */}
              <div className="prose prose-lg max-w-none prose-p:font-medium">
                <p className="text-lg md:text-xl text-zinc-600 font-bold mb-6 border-l-4 border-brand-blue pl-4 leading-relaxed italic">
                  {description ? <span dangerouslySetInnerHTML={{ __html: description }} /> : 'News description will appear here...'}
                </p>
                <div 
                  className="rich-text-content text-zinc-800 text-base md:text-lg leading-relaxed space-y-6 font-normal"
                  dangerouslySetInnerHTML={{ __html: editorContent || '<p className="text-zinc-400 font-medium">Detailed news article will appear here.</p>' }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Editor Layout */
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Form Fields (Left Column - 60%) */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Basic Fields */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
                  <h3 className="text-lg font-black text-brand-dark flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-brand-red rounded-full"></span>
                    <span>Basic Information</span>
                  </h3>
                  {activeField !== 'content' && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Edit Mode: {activeField === 'title' ? 'Title' : 'Description'}
                    </span>
                  )}
                </div>
                
                <div>
                  <label className="block text-zinc-700 font-bold mb-1.5 text-base">
                    खबर का मुख्य Title <span className="text-red-500">*</span>
                  </label>
                  
                  {/* Rich Text Title Editor */}
                  <div
                    ref={titleRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleTitleInput}
                    onFocus={() => setActiveField('title')}
                    placeholder="खबर का मुख्य Title दर्ज करें"
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 px-4 font-bold text-zinc-800 focus:outline-none transition-all rich-text-content min-h-[50px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-700 font-bold mb-1.5 text-base">News Category</label>
                    <select
                      value={category}
                      onChange={(e) => { setCategory(e.target.value); setSaveStatus('unsaved'); }}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 px-4 font-semibold text-zinc-700 focus:outline-none transition-all cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-zinc-700 font-bold mb-1.5 text-base">Author / Reporter</label>
                    <input
                      type="text"
                      placeholder="e.g., Special Reporter, Editor"
                      value={author}
                      onChange={(e) => { setAuthor(e.target.value); setSaveStatus('unsaved'); }}
                      className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 px-4 font-semibold text-zinc-800 focus:outline-none transition-all"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-zinc-700 font-bold mb-1.5 text-xs">State</label>
                      <select
                        value={selectedState}
                        onChange={(e) => { 
                          setSelectedState(e.target.value); 
                          setLocation(e.target.value ? `Other, ${e.target.value}` : '');
                          setSaveStatus('unsaved'); 
                        }}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue rounded-xl py-3 px-2 font-semibold text-zinc-700 text-base focus:outline-none transition-all cursor-pointer"
                      >
                        <option value="">Select State...</option>
                        {Object.keys(indianStatesAndCities).map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-zinc-700 font-bold mb-1.5 text-xs">City</label>
                      {selectedState ? (
                        <select
                          value={location.split(',')[0]}
                          onChange={(e) => {
                            setLocation(`${e.target.value}, ${selectedState}`);
                            setSaveStatus('unsaved');
                          }}
                          className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue rounded-xl py-3 px-2 font-semibold text-zinc-700 text-base focus:outline-none transition-all cursor-pointer"
                        >
                          <option value="">Select City...</option>
                          {indianStatesAndCities[selectedState]?.map(city => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          placeholder="Select State First"
                          disabled
                          className="w-full bg-zinc-100 border border-zinc-200 rounded-xl py-3 px-3 font-semibold text-zinc-400 text-base focus:outline-none"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-700 font-bold mb-1.5 text-base">
                    Source Link <span className="text-zinc-400 font-normal text-xs">(Optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={sourceLink}
                    onChange={(e) => { setSourceLink(e.target.value); setSaveStatus('unsaved'); }}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 px-4 font-semibold text-zinc-800 focus:outline-none transition-all"
                  />
                </div>

              </div>

              {/* Rich Text Content Editor */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-3">
                  <h3 className="text-lg font-black text-brand-dark flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-brand-blue rounded-full"></span>
                    <span>Main News Content (Rich Text Editor)</span>
                  </h3>
                  {activeField === 'content' && (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                      Edit Mode: मुख्य लेख
                    </span>
                  )}
                </div>

                {/* Editor Toolbar (Shared across all fields) */}
                <div className="flex flex-wrap items-center gap-1.5 bg-zinc-100 p-2 rounded-xl border border-zinc-200 relative">
                  
                  {/* Basic Actions */}
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('bold'); }}
                    title="Bold"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90 font-bold"
                  >
                    <Bold size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('italic'); }}
                    title="Italic"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <Italic size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('underline'); }}
                    title="Underline"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <Underline size={16} />
                  </button>
                  
                  <span className="w-[1px] h-6 bg-zinc-300 mx-1"></span>

                  {/* LINK & QUOTE */}
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleInsertLink(); }}
                    title="Link"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <LinkIcon size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('insertText', '"'); }}
                    title="Double Quotes"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <Quote size={16} />
                  </button>

                  <span className="w-[1px] h-6 bg-zinc-300 mx-1"></span>

                  {/* 1. TEXT COLOR PICKER */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => { setShowTextColorPicker(!showTextColorPicker); setShowBgColorPicker(false); }}
                      title="Text Color"
                      className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black flex items-center gap-1 active:scale-95"
                    >
                      <Palette size={16} />
                      <span className="text-[10px] font-bold">Color</span>
                    </button>
                    {showTextColorPicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-zinc-200 rounded-xl p-2 shadow-xl z-50 grid grid-cols-4 gap-1.5 w-36">
                        {textColors.map((color) => (
                          <button
                            key={color.name}
                            type="button; cursor-pointer"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleEditorCommand('foreColor', color.value);
                              setShowTextColorPicker(false);
                            }}
                            title={color.name}
                            className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all ${color.hex} border border-zinc-200/50`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. HIGHLIGHT / BG COLOR PICKER */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => { setShowBgColorPicker(!showBgColorPicker); setShowTextColorPicker(false); }}
                      title="Highlightर Color (Highlight/Background Color)"
                      className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-yellow-600 hover:text-yellow-700 flex items-center gap-1 active:scale-95"
                    >
                      <Highlighter size={16} />
                      <span className="text-[10px] font-bold">Highlight</span>
                    </button>
                    {showBgColorPicker && (
                      <div className="absolute top-full left-0 mt-1 bg-white border border-zinc-200 rounded-xl p-2 shadow-xl z-50 grid grid-cols-4 gap-1.5 w-36">
                        {bgColors.map((color) => (
                          <button
                            key={color.name}
                            type="button"
                            onMouseDown={(e) => {
                              e.preventDefault();
                              handleEditorCommand('hiliteColor', color.value);
                              setShowBgColorPicker(false);
                            }}
                            title={color.name}
                            className={`w-6 h-6 rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all ${color.hex} border border-zinc-200`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <span className="w-[1px] h-6 bg-zinc-300 mx-1"></span>

                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('insertUnorderedList'); }}
                    title="Bullet List"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <List size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('insertOrderedList'); }}
                    title="Numbered List"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <ListOrdered size={16} />
                  </button>

                  <span className="w-[1px] h-6 bg-zinc-300 mx-1"></span>

                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('justifyLeft'); }}
                    title="Align Left"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <AlignLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('justifyCenter'); }}
                    title="Align Center"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <AlignCenter size={16} />
                  </button>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); handleEditorCommand('justifyRight'); }}
                    title="Align Right"
                    className="p-2 hover:bg-zinc-200 rounded-lg transition-all text-zinc-700 hover:text-black active:scale-90"
                  >
                    <AlignRight size={16} />
                  </button>

                  <span className="w-[1px] h-6 bg-zinc-300 mx-1"></span>

                  <select
                    onChange={(e) => handleEditorCommand('formatBlock', e.target.value)}
                    className="bg-white border border-zinc-200 rounded-lg py-1 px-2 text-xs font-bold text-zinc-600 outline-none cursor-pointer"
                    defaultValue="p"
                    title="Format Block"
                  >
                    <option value="p">Normal Paragraph</option>
                    <option value="h1">Main Heading (H1)</option>
                    <option value="h2">Sub-Heading (H2)</option>
                    <option value="h3">Small Header (H3)</option>
                    <option value="blockquote">Blockquote</option>
                  </select>
                </div>

                {/* Content Editor */}
                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  onInput={handleEditorInput}
                  onFocus={() => setActiveField('content')}
                  placeholder="Type the detailed description of the main news here..."
                  className="w-full min-h-[300px] border border-zinc-200 rounded-xl p-4 bg-zinc-50 focus:bg-white focus:border-brand-blue outline-none text-zinc-800 text-lg leading-relaxed rich-text-content"
                  style={{ minHeight: '300px' }}
                />
              </div>
              
              {/* Tags and Keywords */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-6 py-6">
                <h3 className="text-lg font-black text-brand-dark border-b border-zinc-100 pb-2">
                  Tags & Keywords
                </h3>
                
                <div>
                  <label className="block text-zinc-700 font-bold mb-1.5 text-base">Suggested Tags (Templates)</label>
                  <div className="flex flex-wrap gap-2 mb-3 py-2">
                    {["Breaking", "Exclusive", "Trending", "Special Report", "Update", "Viral", "Politics"].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (!tags.includes(tag)) {
                            setTags([...tags, tag]);
                            setSaveStatus('unsaved');
                          }
                        }}
                        className="bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold px-3 py-1 rounded-full transition-all cursor-pointer"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                  
                  <label className="block text-zinc-700 font-bold mb-1.5 text-base py-2">Add Custom Tag (Press Enter)</label>
                  <input
                    type="text"
                    placeholder="Type new tag and press Enter..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = e.target.value;
                        if (!val.trim()) return;

                        let newTags = [];
                        if (val.includes(',')) {
                            newTags = val.split(',').map(t => t.trim());
                        } else if (val.includes('#')) {
                            newTags = val.split(' ').map(t => t.replace(/#/g, '').trim());
                        } else {
                            newTags = [val.trim()];
                        }
                        
                        newTags = newTags.filter(t => t !== '');
                        
                        if (newTags.length > 0) {
                          setTags(prev => {
                            const updated = [...prev];
                            newTags.forEach(t => {
                               if (!updated.includes(t)) updated.push(t);
                            });
                            return updated;
                          });
                          e.target.value = '';
                          setSaveStatus('unsaved');
                        }
                      }
                    }}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue focus:bg-white rounded-xl py-2 px-4 font-semibold text-zinc-800 focus:outline-none transition-all mb-4 text-base"
                  />

                  <label className="block text-zinc-700 font-bold mb-1.5 text-base">Selected Tags</label>
                  <div className="flex flex-wrap gap-2 min-h-[40px] p-2 bg-zinc-50 border border-zinc-200 rounded-xl mb-4">
                    {tags.length === 0 && <span className="text-zinc-400 text-xs py-1">No tags selected</span>}
                    {tags.map(tag => (
                      <span key={tag} className="bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        {tag}
                        <button type="button" onClick={() => {
                          setTags(tags.filter(t => t !== tag));
                          setSaveStatus('unsaved');
                        }} className="hover:text-red-300 cursor-pointer">
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-700 font-bold mb-1.5 text-base">
                    Search Keywords (SEO)
                  </label>
                  <textarea
                    placeholder="Enter keywords separated by comma (,)..."
                    value={keywords}
                    onChange={(e) => { setKeywords(e.target.value); setSaveStatus('unsaved'); }}
                    className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue focus:bg-white rounded-xl py-3 px-4 font-medium text-zinc-700 focus:outline-none transition-all min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar (Right Column - 40%) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Media Upload Area */}
              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
                <h3 className="text-md font-black text-brand-dark border-b border-zinc-100 pb-2 flex items-center gap-2">
                  <span>Media File (Image / Video)</span>
                </h3>

                {/* Choose News Type */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => { setNewsType('text'); setMediaUrl(''); setSaveStatus('unsaved'); }}
                    className={`py-2.5 px-4 rounded-xl font-bold text-base border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      newsType === 'text' 
                        ? 'bg-brand-red text-white border-brand-red shadow-md' 
                        : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200'
                    }`}
                  >
                    <ImageIcon size={16} />
                    <span>Image News</span>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => { setNewsType('video'); setMediaUrl(''); setSaveStatus('unsaved'); }}
                    className={`py-2.5 px-4 rounded-xl font-bold text-base border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      newsType === 'video' 
                        ? 'bg-brand-blue text-white border-brand-blue shadow-md' 
                        : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200'
                    }`}
                  >
                    <Video size={16} />
                    <span>Video News</span>
                  </button>
                </div>

                {/* Selector */}
                <div className="relative border-2 border-dashed border-zinc-200 hover:border-brand-blue rounded-2xl p-6 text-center transition-all bg-zinc-50/50 hover:bg-zinc-50 cursor-pointer">
                  <input
                    type="file"
                    accept={newsType === 'video' ? 'video/*' : 'image/*'}
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2 pointer-events-none">
                    <UploadCloud className="w-10 h-10 text-zinc-400" />
                    <span className="font-bold text-base text-zinc-700">
                      {isUploading ? 'Uploading...' : `Choose File (${newsType === 'video' ? 'Video' : 'Image'})`}
                    </span>
                    <span className="text-zinc-400 text-xs font-semibold">
                      ImageKit API Upload via
                    </span>
                  </div>
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="w-full bg-zinc-100 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${newsType === 'video' ? 'bg-brand-blue' : 'bg-brand-red'}`} 
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-bold text-zinc-500 text-right">{uploadProgress}% Uploaded</div>
                  </div>
                )}

                {uploadSuccess && (
                  <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 flex items-center gap-2 text-xs font-bold">
                    <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                    <span>
                      File {!ikPublicKey ? 'Simulated Successfully' : 'Successfully on ImageKit'} Uploaded!
                    </span>
                  </div>
                )}

                {uploadError && (
                  <div className="bg-red-50 text-red-800 p-3 rounded-xl border border-red-100 flex items-center gap-2 text-xs font-bold">
                    <AlertCircle size={16} className="text-red-600 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                )}

                {/* Inputs */}
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-zinc-700 font-bold mb-1 text-xs">Generated CDN URL</label>
                    <input
                      type="url"
                      placeholder="यहाँ Image/Video का डायरेक्ट यूआरएल दिखेगा"
                      value={mediaUrl}
                      onChange={(e) => { setMediaUrl(e.target.value); setSaveStatus('unsaved'); }}
                      className="w-full bg-zinc-100 border border-zinc-200 rounded-xl py-2 px-3 text-xs font-medium text-zinc-600 focus:outline-none"
                    />
                  </div>

                  {newsType === 'video' && (
                    <div>
                      <label className="block text-zinc-700 font-bold mb-1 text-xs">YouTube or Alternative Video URL</label>
                      <input
                        type="url"
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => { setVideoUrl(e.target.value); setSaveStatus('unsaved'); }}
                        className="w-full bg-zinc-50 border border-zinc-200 focus:border-brand-blue focus:bg-white rounded-xl py-2 px-3 text-xs font-semibold text-zinc-800 focus:outline-none transition-all"
                      />
                    </div>
                  )}
                </div>
              </div>



              {/* API and ImageKit config panel */}
      
      
            </div>

          </div>
        )}

        {/* --- 3. DRAFTS / UNPUBLISHED NEWS DASHBOARD LIST PANEL --- */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-brand-dark flex items-center gap-2">
                <FileText className="text-brand-blue w-6 h-6" />
                <span>Unpublished News Drafts</span>
              </h3>
              <p className="text-zinc-500 text-xs font-semibold mt-1">
                Below is the list of all news saved in the database but not yet published live.
              </p>
            </div>
            
            <button
              onClick={fetchDrafts}
              className="self-start sm:self-auto bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold py-2 px-4 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              Refresh List
            </button>
          </div>

          {draftsError && (
            <div className="bg-red-50 text-red-900 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="text-red-600 w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-base">Error (Draft Fetch Error):</p>
                <p className="text-xs font-semibold mt-1">{draftsError}</p>
                <p className="text-xs font-medium text-zinc-500 mt-2">
                  * If you have not yet added the <strong>GET '/news/drafts'</strong> endpoint in your node express backend, please add the code provided in <strong>backend_code_reference.md</strong> में दिए गए कोड को राउटर File में जोड़ें और सर्वर रीस्टार्ट करें।
                </p>
              </div>
            </div>
          )}

          {draftsLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-4 border-zinc-300 border-t-brand-blue rounded-full animate-spin"></div>
              <p className="text-zinc-500 text-xs font-bold">Loading drafts...</p>
            </div>
          ) : drafts.length === 0 ? (
            <div className="py-12 text-center border border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
              <FileText className="mx-auto text-zinc-300 w-12 h-12 mb-3" />
              <p className="text-zinc-500 font-bold text-base">No unpublished drafts found</p>
              <p className="text-zinc-400 text-xs mt-1">All news are published live or no draft is saved.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drafts.map((draft) => (
                <div 
                  key={draft._id || draft.id} 
                  className="border border-zinc-200 hover:border-zinc-300 rounded-2xl p-5 bg-zinc-50/20 hover:bg-zinc-50/50 transition-all flex flex-col justify-between gap-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-zinc-100 text-zinc-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {draft.category}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-bold">{draft.date}</span>
                    </div>

                    <h4 className="font-bold text-zinc-800 leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
                      {draft.title && (draft.title.includes('<') || draft.title.includes('&')) ? (
                        <span dangerouslySetInnerHTML={{ __html: draft.title }} />
                      ) : (
                        draft.title
                      )}
                    </h4>
                    
                    <p className="text-zinc-500 text-xs font-semibold line-clamp-2 leading-relaxed">
                      {draft.description && (draft.description.includes('<') || draft.description.includes('&')) ? (
                        <span dangerouslySetInnerHTML={{ __html: draft.description }} />
                      ) : (
                        draft.description
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-100 pt-3.5 mt-1 gap-2">
                    <span className="text-[10px] text-zinc-400 font-medium">Author: {draft.author}</span>
                    
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Action 1: Load into editor */}
                      <button
                        onClick={() => loadDraftIntoEditor(draft)}
                        className="bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-600 text-[11px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer shadow-sm"
                      >
                        Edit
                      </button>
                      
                      {/* Action 2: Publish Directly from list */}
                      <button
                        onClick={() => publishSingleDraft(draft._id || draft.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg active:scale-95 transition-all cursor-pointer shadow flex items-center gap-1"
                      >
                        <Globe size={11} />
                        <span>Make Live</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
