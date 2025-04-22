
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface DeployDialogProps {
  isOpen: boolean;
  onClose: () => void;
  linkData: any;
}

const DeployDialog = ({ isOpen, onClose, linkData }: DeployDialogProps) => {
  const handleDeploy = () => {
    toast({
      title: "Deployment successful",
      description: "The link code is merged to master",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Confirm Deployment</DialogTitle>
          <DialogDescription>
            Please review the link data before deploying
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="bg-gray-50 p-4 rounded-lg max-h-[400px] overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(linkData, null, 2)}
            </pre>
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleDeploy}
            className="bg-blue-600 hover:bg-blue-700 animate-pulse"
          >
            Confirm Deployment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeployDialog;
