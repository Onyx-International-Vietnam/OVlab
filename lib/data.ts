// lib/data.ts (v2) – Rooms, Participants, Reports, Invitations, Datasets

export type Room = {
    id: string;
    title: string;
    status: "LIVE" | "OFFLINE";
    viewers: number;
    thumbnail: string;
  };
  
  export type Participant = {
    name: string;
    role: "Owner" | "Viewer";
    online: boolean;
  };
  
  export type Report = { id: string; title: string; date: string };
  
  export type InvitationStatus = "Pending" | "Accepted" | "Revoked" | "Expired";
  export type Invitation = {
    token: string;
    roomId: string;
    email: string;
    status: InvitationStatus;
    createdAt: string; // ISO
    expiresAt: string; // ISO
  };
  
  export type Dataset = {
    id: string;
    name: string;
    kind: "video" | "image" | "csv" | "pdf";
    size: string;
    updatedAt: string; // YYYY-MM-DD
    url?: string;
    poster?: string; // for video/image preview
  };
  
  // ===== Rooms (FAKE DATA) =====
  export const ROOMS: Room[] = [
    {
      id: "r-carbon",
      title: "Carbon Beam Test #102-B",
      status: "LIVE",
      viewers: 12,
      thumbnail:
        "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "r-thermal",
      title: "Thermal Stress Analysis",
      status: "OFFLINE",
      viewers: 0,
      thumbnail:
        "https://images.unsplash.com/photo-1614410533884-41c54f3c6313?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "r-vibration",
      title: "Vibration Testing Lab",
      status: "LIVE",
      viewers: 7,
      thumbnail:
        "https://images.unsplash.com/photo-1581092335397-9583eb92d232?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "r-fatigue",
      title: "Material Fatigue Test",
      status: "OFFLINE",
      viewers: 0,
      thumbnail:
        "https://images.unsplash.com/photo-1581091219558-9be9c7e20d1e?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "r-pressure",
      title: "Pressure Vessel Testing",
      status: "LIVE",
      viewers: 28,
      thumbnail:
        "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "r-corrosion",
      title: "Corrosion Chamber Test",
      status: "LIVE",
      viewers: 9,
      thumbnail:
        "https://images.unsplash.com/photo-1581092334607-3d6a5c3f9a20?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "r-tensile",
      title: "Tensile Strength Lab",
      status: "LIVE",
      viewers: 7,
      thumbnail:
        "https://images.unsplash.com/photo-1535430236511-4e8a9f0a1d2a?q=80&w=1600&auto=format&fit=crop",
    },
    {
      id: "r-environment",
      title: "Environmental Chamber",
      status: "OFFLINE",
      viewers: 0,
      thumbnail:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1600&auto=format&fit=crop",
    },
  ];
  
  // ===== Participants per room =====
  export const PARTICIPANTS: Record<string, Participant[]> = {
    "r-carbon": [
      { name: "Member 01", role: "Owner", online: true },
      { name: "Member 02", role: "Viewer", online: true },
      { name: "Member 03", role: "Viewer", online: false },
    ],
    "r-vibration": [
      { name: "Alice", role: "Owner", online: true },
      { name: "Bob", role: "Viewer", online: true },
    ],
  };
  
  // ===== Reports per room =====
  export const REPORTS: Record<string, Report[]> = {
    "r-carbon": [
      { id: "rep-1", title: "System Test Report", date: "2024-03-15" },
      { id: "rep-2", title: "Performance Analysis", date: "2025-03-10" },
      { id: "rep-3", title: "Load Test Summary", date: "2025-03-12" },
    ],
  };
  
  // ===== Invitations =====
  export const INVITATIONS: Invitation[] = [
    {
      token: "tok-carbon-1",
      roomId: "r-carbon",
      email: "diana@ovlab.io",
      status: "Pending",
      createdAt: "2025-10-20T09:00:00Z",
      expiresAt: "2025-11-20T09:00:00Z",
    },
    {
      token: "tok-vibration-1",
      roomId: "r-vibration",
      email: "guest1@ovlab.io",
      status: "Accepted",
      createdAt: "2025-10-15T08:00:00Z",
      expiresAt: "2025-11-15T08:00:00Z",
    },
    {
      token: "tok-pressure-expired",
      roomId: "r-pressure",
      email: "qa-team@ovlab.io",
      status: "Expired",
      createdAt: "2025-08-10T08:00:00Z",
      expiresAt: "2025-09-10T08:00:00Z",
    },
  ];
  
  // Emails currently allowed to access each room (mock)
  export const ROOM_ACCESS: Record<string, string[]> = {
    "r-carbon": ["alice@ovlab.io", "bob@ovlab.io"],
    "r-vibration": ["alice@ovlab.io"],
    "r-pressure": [],
  };
  
  // ===== Datasets per room =====
  export const DATASETS: Record<string, Dataset[]> = {
    "r-carbon": [
      {
        id: "ds-carbon-1",
        name: "CarbonBeam-Run102B.csv",
        kind: "csv",
        size: "28 KB",
        updatedAt: "2025-10-21",
        url: "#",
      },
      {
        id: "ds-carbon-2",
        name: "HighSpeed-video.mp4",
        kind: "video",
        size: "54 MB",
        updatedAt: "2025-10-21",
        url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        poster:
          "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop",
      },
      {
        id: "ds-carbon-3",
        name: "Specimen-Photo.jpg",
        kind: "image",
        size: "620 KB",
        updatedAt: "2025-10-21",
        url: "https://picsum.photos/seed/specimen/1200/800",
      },
      {
        id: "ds-carbon-4",
        name: "TestReport-102B.pdf",
        kind: "pdf",
        size: "1.2 MB",
        updatedAt: "2025-10-21",
        url: "#",
      },
    ],
    "r-vibration": [
      {
        id: "ds-vib-1",
        name: "Accel-Readings.csv",
        kind: "csv",
        size: "44 KB",
        updatedAt: "2025-10-18",
        url: "#",
      },
    ],
  };
  
  // ===== Live chart demo data =====
  export const STRESS_STRAIN: { strain: number; stress: number }[] = [
    { strain: 0.0, stress: 0 },
    { strain: 0.1, stress: 22 },
    { strain: 0.25, stress: 58 },
    { strain: 0.5, stress: 90 },
    { strain: 0.75, stress: 98 },
    { strain: 1.0, stress: 92 },
  ];
  
  // ===== Key metrics in the Live Data tab =====
  export const KEY_METRICS = [
    { id: "maxLoad", label: "Max Load", value: "45.2 kN", icon: "weight" as const },
    { id: "displacement", label: "Displacement", value: "2.1 mm", icon: "ruler" as const },
    { id: "temperature", label: "Temperature", value: "61.4 °C", icon: "thermo" as const },
  ];
  
  // ===== Helpers =====
  export function getRoom(id: string) {
    return ROOMS.find((r) => r.id === id) ?? ROOMS[0];
  }
  
  export function getRoomTitle(id: string) {
    return ROOMS.find((r) => r.id === id)?.title ?? id;
  }
  
  export function getInvitation(token: string) {
    return INVITATIONS.find((i) => i.token === token);
  }
  