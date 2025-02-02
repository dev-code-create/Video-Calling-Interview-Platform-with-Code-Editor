import {
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";

function MeetingRoom() {
  const router = useRouter();
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal">
      {/* Left Side */}
      <ResizablePanel
        defaultSize={35}
        minSize={25}
        maxSize={100}
        className="relative"
      >
        {/* Video Layout */}
        <div className="absolute inset-0">
          {layout === "grid" ? <PaginatedGridLayout /> : <SpeakerLayout />}

          {/* PARTICIPANTS LIST OVERLAY */}
          {showParticipants && (
            <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <CallParticipantsList
                onClose={() => setShowParticipants(false)}
              />
            </div>
          )}
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* RIght Side */}
      <ResizablePanel defaultSize={65} minSize={25}>
        <h1>Code Editor Goes Her</h1>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default MeetingRoom;
