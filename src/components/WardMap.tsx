import { useState } from 'react';
import { Asset, RoomReadiness } from '@/types/wardops';
import { Activity } from 'lucide-react';

interface WardMapProps {
  assets: Asset[];
  roomReadiness: RoomReadiness[];
  onRoomSelect: (roomId: string) => void;
  onAssetSelect: (assetId: string) => void;
  selectedRoomId: string | null;
}

const assetStateColors = {
  'in_use': 'text-accent-green',
  'idle_ready': 'text-accent-blue',
  'idle_too_long': 'text-accent-yellow',
  'missing': 'text-accent-red',
  'dirty': 'text-accent-yellow',
  'broken': 'text-accent-red',
};

export function WardMap({ assets, roomReadiness, onRoomSelect, onAssetSelect, selectedRoomId }: WardMapProps) {
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);

  const getRoomAssets = (roomId: string) => {
    return assets.filter(a => a.roomId === roomId);
  };

  const getRoomReadinessColor = (roomId: string) => {
    const readiness = roomReadiness.find(r => r.roomId === roomId);
    if (!readiness) return 'border-border';
    
    if (readiness.readinessScore >= 90) return 'border-accent-green';
    if (readiness.readinessScore >= 70) return 'border-accent-yellow';
    return 'border-accent-red';
  };

  return (
    <div className="h-full p-6 flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-text-primary">Ward 101 - Floor Plan</h3>
        <p className="text-sm text-text-secondary">Click rooms or assets for details</p>
      </div>

      <div className="flex-1 glass-panel rounded-lg p-8 relative">
        {/* Stylized Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(hsl(var(--accent-cyan)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent-cyan)) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Rooms Layout */}
        <div className="relative h-full grid grid-cols-2 gap-8">
          {/* Room 101 */}
          <div
            onClick={() => onRoomSelect('room-101')}
            className={`
              border-2 rounded-lg p-6 cursor-pointer transition-glow relative
              ${selectedRoomId === 'room-101' ? 'glow-border-cyan' : getRoomReadinessColor('room-101')}
            `}
          >
            <div className="absolute top-3 left-3">
              <h4 className="text-lg font-bold text-text-primary">Room 101</h4>
              <div className="flex items-center gap-2 mt-1">
                <Activity className="h-3 w-3 text-accent-yellow" />
                <span className="text-xs text-text-secondary">72% Ready</span>
              </div>
            </div>

            {/* Assets in Room 101 */}
            <div className="mt-16 space-y-3">
              {getRoomAssets('room-101').map(asset => (
                <button
                  key={asset.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssetSelect(asset.id);
                  }}
                  onMouseEnter={() => setHoveredAsset(asset.id)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  className={`
                    w-full px-3 py-2 rounded text-left text-sm
                    bg-bg-tertiary/50 border transition-smooth
                    hover:bg-bg-tertiary hover:scale-105
                    ${assetStateColors[asset.state]}
                  `}
                  style={{ borderColor: hoveredAsset === asset.id ? 'hsl(var(--accent-cyan))' : 'hsl(var(--border-subtle))' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{asset.name}</span>
                    <span className={`h-2 w-2 rounded-full ${
                      asset.state === 'in_use' ? 'bg-accent-green' :
                      asset.state === 'idle_ready' ? 'bg-accent-blue' :
                      asset.state === 'idle_too_long' ? 'bg-accent-yellow' :
                      'bg-accent-red'
                    }`} />
                  </div>
                  <div className="text-xs text-text-tertiary mt-0.5">{asset.stateLabel}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Room 102 */}
          <div
            onClick={() => onRoomSelect('room-102')}
            className={`
              border-2 rounded-lg p-6 cursor-pointer transition-glow relative
              ${selectedRoomId === 'room-102' ? 'glow-border-cyan' : getRoomReadinessColor('room-102')}
            `}
          >
            <div className="absolute top-3 left-3">
              <h4 className="text-lg font-bold text-text-primary">Room 102</h4>
              <div className="flex items-center gap-2 mt-1">
                <Activity className="h-3 w-3 text-accent-green" />
                <span className="text-xs text-text-secondary">95% Ready</span>
              </div>
            </div>

            {/* Assets in Room 102 */}
            <div className="mt-16 space-y-3">
              {getRoomAssets('room-102').map(asset => (
                <button
                  key={asset.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssetSelect(asset.id);
                  }}
                  onMouseEnter={() => setHoveredAsset(asset.id)}
                  onMouseLeave={() => setHoveredAsset(null)}
                  className={`
                    w-full px-3 py-2 rounded text-left text-sm
                    bg-bg-tertiary/50 border transition-smooth
                    hover:bg-bg-tertiary hover:scale-105
                    ${assetStateColors[asset.state]}
                  `}
                  style={{ borderColor: hoveredAsset === asset.id ? 'hsl(var(--accent-cyan))' : 'hsl(var(--border-subtle))' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{asset.name}</span>
                    <span className={`h-2 w-2 rounded-full ${
                      asset.state === 'in_use' ? 'bg-accent-green' :
                      asset.state === 'idle_ready' ? 'bg-accent-blue' :
                      'bg-accent-red'
                    }`} />
                  </div>
                  <div className="text-xs text-text-tertiary mt-0.5">{asset.stateLabel}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
