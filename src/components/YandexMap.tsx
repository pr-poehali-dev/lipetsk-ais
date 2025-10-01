import { useEffect, useRef } from 'react';

interface Activity {
  id: number;
  name: string;
  organization: string;
  district: string;
  category: string;
  address: string;
  coordinates: [number, number];
}

interface YandexMapProps {
  activities: Activity[];
  onActivitySelect?: (activity: Activity) => void;
}

declare global {
  interface Window {
    ymaps: any;
  }
}

const YandexMap = ({ activities, onActivitySelect }: YandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      if (!window.ymaps) {
        setTimeout(initMap, 100);
        return;
      }

      window.ymaps.ready(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
        }

        const map = new window.ymaps.Map(mapRef.current, {
          center: [52.6031, 39.5708],
          zoom: 12,
          controls: ['zoomControl', 'searchControl', 'typeSelector', 'fullscreenControl']
        });

        mapInstanceRef.current = map;

        activities.forEach((activity) => {
          const placemark = new window.ymaps.Placemark(
            activity.coordinates,
            {
              balloonContentHeader: `<strong>${activity.name}</strong>`,
              balloonContentBody: `
                <div style="padding: 8px 0;">
                  <p style="margin: 4px 0;"><strong>${activity.organization}</strong></p>
                  <p style="margin: 4px 0; color: #666;">${activity.address}</p>
                  <p style="margin: 4px 0;">
                    <span style="display: inline-block; padding: 2px 8px; background: #e8f4f8; border-radius: 4px; font-size: 12px;">
                      ${activity.category}
                    </span>
                  </p>
                </div>
              `,
              balloonContentFooter: '<button style="margin-top: 8px; padding: 6px 12px; background: #2D3748; color: white; border: none; border-radius: 4px; cursor: pointer;">Подробнее</button>',
              hintContent: activity.name
            },
            {
              preset: activity.category === 'Спорт' 
                ? 'islands#blueCircleDotIcon' 
                : activity.category === 'Творчество'
                ? 'islands#violetCircleDotIcon'
                : activity.category === 'Наука'
                ? 'islands#greenCircleDotIcon'
                : 'islands#orangeCircleDotIcon',
              iconColor: activity.category === 'Спорт'
                ? '#2D3748'
                : activity.category === 'Творчество'
                ? '#9b59b6'
                : activity.category === 'Наука'
                ? '#27ae60'
                : '#e67e22'
            }
          );

          placemark.events.add('click', () => {
            if (onActivitySelect) {
              onActivitySelect(activity);
            }
          });

          map.geoObjects.add(placemark);
        });
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [activities, onActivitySelect]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '600px',
        borderRadius: '8px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default YandexMap;
