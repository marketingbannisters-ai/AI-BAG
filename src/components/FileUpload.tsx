import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, FileIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Upload successful",
      description: `${selectedFile.name} has been uploaded.`,
    });

    // Reset form
    setSelectedFile(null);
    setDescription("");
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="h-full p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 transition-all ${
              isDragging
                ? "border-primary bg-primary/5 scale-[1.02]"
                : "border-border bg-card hover:border-primary/50"
            }`}
          >
            <input
              type="file"
              id="file-input"
              className="hidden"
              onChange={handleFileSelect}
            />

            {!selectedFile ? (
              <label
                htmlFor="file-input"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                  <Upload className="h-8 w-8 text-primary-foreground" />
                </div>
                <p className="text-lg font-medium mb-2">
                  Drop your file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Support for all file types
                </p>
              </label>
            ) : (
              <div className="flex items-center justify-between bg-secondary/50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeFile}
                  className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for your file..."
              className="min-h-[120px] rounded-xl border-input focus-visible:ring-primary"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition-opacity rounded-xl py-6 text-base font-medium"
            disabled={!selectedFile}
          >
            Upload File
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FileUpload;
