import { WifiOff, CloudUpload, Loader2 } from "lucide-react";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { Button } from "@/components/ui/button";

interface OfflineBannerProps {
  pendingCount?: number;
  syncing?: boolean;
  onSync?: () => Promise<void>;
}

const OfflineBanner = ({ pendingCount = 0, syncing = false, onSync }: OfflineBannerProps) => {
  const isOnline = useOnlineStatus();

  if (!isOnline) {
    return (
      <div className="bg-destructive text-destructive-foreground px-4 py-2 text-center text-sm flex items-center justify-center gap-2 sticky top-0 z-50">
        <WifiOff className="h-4 w-4" />
        <span>لا يوجد اتصال بالإنترنت - يمكنك إضافة بيانات وسيتم ترحيلها عند عودة الاتصال</span>
        {pendingCount > 0 && (
          <span className="bg-destructive-foreground/20 rounded-full px-2 py-0.5 text-xs font-bold">
            {pendingCount} معلقة
          </span>
        )}
      </div>
    );
  }

  if (pendingCount > 0) {
    return (
      <div className="bg-orange-500 text-white px-4 py-2 text-center text-sm flex items-center justify-center gap-2 sticky top-0 z-50">
        <CloudUpload className="h-4 w-4" />
        <span>يوجد {pendingCount} عملية معلقة بحاجة للمزامنة</span>
        <Button
          size="sm"
          variant="secondary"
          className="h-6 px-3 text-xs"
          onClick={() => onSync?.()}
          disabled={syncing}
        >
          {syncing ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin mr-1" />
              جارٍ المزامنة...
            </>
          ) : (
            'مزامنة الآن'
          )}
        </Button>
      </div>
    );
  }

  return null;
};

export default OfflineBanner;
