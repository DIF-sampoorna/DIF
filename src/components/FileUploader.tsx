import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, Check, AlertTriangle, Loader2 } from 'lucide-react';

interface FileUploaderProps {
  onUploadSuccess: (url: string) => void;
  accept?: string;
  label?: string;
  helperText?: string;
}

export default function FileUploader({
  onUploadSuccess,
  accept = 'image/*,video/*',
  label = 'Upload Direct Media',
  helperText = 'Supports PNG, JPG, JPEG, or MP4 files'
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [fileName, setFileName] = useState('');
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Helper to read file as Base64 and send to server
  const processAndUploadFile = async (file: File) => {
    if (!file) return;

    setUploadState('uploading');
    setErrorMessage('');
    setFileName(file.name);

    try {
      const reader = new FileReader();
      
      // Setup reader promise
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert file to Base64'));
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });

      const base64Data = await base64Promise;

      // POST to our server API
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminEmail: 'contact@dif-sampoorna.ngo',
          filename: file.name,
          base64Data: base64Data,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setUploadState('success');
        setUploadedUrl(result.url);
        onUploadSuccess(result.url);
      } else {
        throw new Error(result.error || 'Server rejected the file upload');
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      setUploadState('error');
      setErrorMessage(err?.message || 'Error uploading file. Please try again.');
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processAndUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processAndUploadFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const resetUploader = () => {
    setUploadState('idle');
    setUploadedUrl('');
    setFileName('');
    setErrorMessage('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs font-mono font-bold text-mhe-charcoal uppercase block">
        {label}
      </span>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={uploadState === 'idle' || uploadState === 'error' ? onButtonClick : undefined}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all flex flex-col items-center justify-center min-h-[140px] cursor-pointer ${
          dragActive
            ? 'border-mhe-orange bg-mhe-orange-light/20 scale-[0.99]'
            : 'border-mhe-charcoal hover:bg-mhe-cream/40 bg-[#FCF7E6]/20'
        } ${uploadState === 'uploading' ? 'pointer-events-none' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {uploadState === 'idle' && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-white border border-mhe-charcoal flex items-center justify-center text-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-xs font-sans font-bold text-mhe-charcoal">
              Drag &amp; drop file here, or <span className="text-mhe-orange underline hover:text-mhe-orange-dark">browse</span>
            </p>
            <p className="text-[10px] font-mono text-gray-400">
              {helperText}
            </p>
          </div>
        )}

        {uploadState === 'uploading' && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-8 h-8 animate-spin text-mhe-orange" />
            <p className="text-xs font-mono font-black text-mhe-charcoal uppercase animate-pulse">
              UPLOADING: {fileName}
            </p>
            <p className="text-[10px] text-gray-400">Converting and sending file chunks...</p>
          </div>
        )}

        {uploadState === 'success' && (
          <div className="flex flex-col items-center gap-2 w-full px-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-500 flex items-center justify-center text-emerald-600">
              <Check className="w-4 h-4" />
            </div>
            <p className="text-xs font-sans font-extrabold text-emerald-600">
              Successfully Uploaded!
            </p>
            <p className="text-[10px] font-mono text-gray-500 break-all bg-white border border-gray-200 px-3 py-1.5 rounded-lg w-full text-center">
              {uploadedUrl}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetUploader();
              }}
              className="text-[10px] font-mono font-bold text-mhe-orange hover:underline cursor-pointer"
            >
              Upload another file
            </button>
          </div>
        )}

        {uploadState === 'error' && (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-500 flex items-center justify-center text-rose-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <p className="text-xs font-sans font-bold text-rose-600">
              Upload Failed
            </p>
            <p className="text-[10px] font-mono text-rose-500 text-center max-w-xs">
              {errorMessage}
            </p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                resetUploader();
              }}
              className="mt-1 text-[10px] font-mono font-bold text-mhe-charcoal underline hover:text-mhe-orange cursor-pointer"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
