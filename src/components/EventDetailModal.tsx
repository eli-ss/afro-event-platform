/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Event, INITIAL_EVENTS } from "./mockEvents";
import EventDetailsPage from "./EventDetailsPage";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
  onRegisterSuccess: (eventId: string) => void;
  isAlreadyRegistered: boolean;
  userEmail?: string;
  userName?: string;
  
  // Optional premium capabilities
  allEvents?: Event[];
  savedEventIds?: string[];
  onToggleSave?: (eventId: string) => void;
  onSelectEvent?: (event: Event) => void;
}

export default function EventDetailModal({
  isOpen,
  onClose,
  event,
  onRegisterSuccess,
  isAlreadyRegistered,
  userEmail = "",
  userName = "",
  allEvents = INITIAL_EVENTS,
  savedEventIds,
  onToggleSave,
  onSelectEvent
}: EventDetailModalProps) {
  // Defensive local fallback state for saved events if not passed by host component
  const [localSavedIds, setLocalSavedIds] = React.useState<string[]>([]);
  const activeSavedIds = savedEventIds !== undefined ? savedEventIds : localSavedIds;
  const activeToggleSave = onToggleSave !== undefined ? onToggleSave : (id: string) => {
    if (localSavedIds.includes(id)) {
      setLocalSavedIds(prev => prev.filter(x => x !== id));
    } else {
      setLocalSavedIds(prev => [...prev, id]);
    }
  };

  // Local state to handle selected event inside details context (e.g. clicking similar events)
  const [currentEvent, setCurrentEvent] = React.useState<Event | null>(null);

  React.useEffect(() => {
    if (event) {
      setCurrentEvent(event);
    }
  }, [event]);

  if (!isOpen || !currentEvent) return null;

  const handleSelectEvent = (selected: Event) => {
    setCurrentEvent(selected);
    if (onSelectEvent) {
      onSelectEvent(selected);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#FAF8F5] overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-300"
      id="modal-detail-fullscreen-overlay"
    >
      <EventDetailsPage
        event={currentEvent}
        allEvents={allEvents}
        isAlreadyRegistered={isAlreadyRegistered}
        onRegisterSuccess={onRegisterSuccess}
        onClose={onClose}
        userEmail={userEmail}
        userName={userName}
        savedEventIds={activeSavedIds}
        onToggleSave={activeToggleSave}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
}
