
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { NavLink } from "@/types/types";

interface DeployDialogProps {
  isOpen: boolean;
  onClose: () => void;
  linkData: NavLink;
  onDeploy: (notes: string) => void;
}

const DeployDialog = ({ isOpen, onClose, linkData, onDeploy }: DeployDialogProps) => {
  const [deploymentNotes, setDeploymentNotes] = useState("");

  const handleDeploy = () => {
    onDeploy(deploymentNotes);
    toast({
      title: "Deployment successful",
      description: "The link has been deployed successfully",
    });
    setDeploymentNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Confirm Deployment</DialogTitle>
          <DialogDescription>
            Please review the link data and add any deployment notes before proceeding
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg max-h-[200px] overflow-y-auto">
            <pre className="whitespace-pre-wrap break-words text-sm">
              {JSON.stringify(linkData, null, 2)}
            </pre>
          </div>
          <div className="space-y-2">
            <label htmlFor="deploymentNotes" className="text-sm font-medium">
              Deployment Notes
            </label>
            <Textarea
              id="deploymentNotes"
              placeholder="Add any relevant deployment notes..."
              value={deploymentNotes}
              onChange={(e) => setDeploymentNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleDeploy}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Confirm Deployment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeployDialog;
