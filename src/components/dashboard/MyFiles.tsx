import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, FileText, FileSpreadsheet, File, ArrowRight, Upload, MoreVertical, Image as ImageIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const files = [
  {
    id: 1,
    name: 'Q4 Report.pdf',
    type: 'pdf',
    size: '2.4 MB',
    modified: new Date(2023, 10, 15),
    starred: true
  },
  {
    id: 2,
    name: 'Patient Records',
    type: 'folder',
    items: 24,
    modified: new Date(2023, 10, 10)
  },
  {
    id: 3,
    name: 'Meeting Notes.docx',
    type: 'docx',
    size: '1.2 MB',
    modified: new Date(2023, 10, 5)
  },
  {
    id: 4,
    name: 'Clinic Photos',
    type: 'folder',
    items: 8,
    modified: new Date(2023, 9, 28)
  },
  {
    id: 5,
    name: 'Budget 2024.xlsx',
    type: 'xlsx',
    size: '3.1 MB',
    modified: new Date(2023, 9, 20)
  }
];

const getFileIcon = (type: string) => {
  const iconProps = { className: 'h-5 w-5' };
  
  switch (type) {
    case 'pdf':
      return { ...iconProps, icon: FileText, color: '#ef4444' };
    case 'doc':
    case 'docx':
      return { ...iconProps, icon: FileText, color: '#3b82f6' };
    case 'xls':
    case 'xlsx':
      return { ...iconProps, icon: FileSpreadsheet, color: '#10b981' };
    case 'jpg':
    case 'png':
    case 'jpeg':
      return { ...iconProps, icon: ImageIcon, color: '#8b5cf6' };
    case 'folder':
      return { ...iconProps, icon: Folder, color: '#f59e0b' };
    default:
      return { ...iconProps, icon: File, color: '#6b7280' };
  }
};

const MyFiles = () => {
  return (
    <Card className="h-full flex flex-col p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Folder className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold">My Files</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 sm:h-8 sm:w-8 hover:bg-accent/10 text-muted-foreground hover:text-foreground"
              title="Upload File"
            >
              <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-accent hover:text-white h-7 sm:h-8 text-xs sm:text-sm "
            >
              View All <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </Button>
          </div>
        </div>
      
      <div className="pb-6 flex-1 overflow-y-auto max-h-[400px]">
        <div className="space-y-2">
          {files.map((file) => {
            const { icon: Icon, color } = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                className="p-3 hover:bg-accent/5 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </h3>
                      <span className="text-xs text-muted-foreground flex-shrink-0">.{file.type}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {file.type === 'folder' ? `${file.items} items` : file.size} • {formatDistanceToNow(file.modified, { addSuffix: true })}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default MyFiles;
