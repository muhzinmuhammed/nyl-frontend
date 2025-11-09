import React, { useMemo, useState } from 'react';
import Header from '../header';
import SidebarNav from '../sidebar';
import './AdminHealing.css';
import { Card, Avatar } from 'antd';
import { SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

type Photo = {
    id: number;
    name: string;
    subtitle?: string;
    src: string;
};

const DEFAULT_TOTAL_PHOTOS = 10;
const DEFAULT_PHOTOS_PER_ROW = 5;

const AdminHealing: React.FC = () => {
    const [totalPhotos, setTotalPhotos] = useState<number>(DEFAULT_TOTAL_PHOTOS);
    const [perRow, setPerRow] = useState<number>(DEFAULT_PHOTOS_PER_ROW);

    // Generate mock photos
    const photos: Photo[] = useMemo(
        () =>
            Array.from({ length: Math.max(0, totalPhotos) }, (_, i) => ({
                id: i,
                name: `Client ${i + 1}`,
                subtitle: 'Client Name',
                src: `https://picsum.photos/seed/healing-${i}/400/300`,
            })),
        [totalPhotos]
    );

    // Handlers
    const handlePerRowChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        setPerRow(Number(e.target.value));

    const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = Number(e.target.value);
        if (Number.isNaN(val)) return;
        setTotalPhotos(Math.max(0, Math.floor(val)));
    };

    return (
        <>
            <Header />
            <SidebarNav />
            <div className='page-wrapper'>
                <div className="admin-healing-root">
                    <div className="panel">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <div>
                                <h2 className="page-title">Admin Healing</h2>
                                <div className="breadcrumb">
                                    <Link to="/admin" className="breadcrumb-link">Dashboard</Link>
                                    <span className="breadcrumb-sep">/</span>
                                    <span>My Patients</span>
                                    <span className="breadcrumb-sep">/</span>
                                    <span>Healing</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn-healing float-end">
                            End Session
                        </button>
                        <div className="panel-header">
                            <div className="panel-controls">
                                <label>
                                    Photos per row:
                                    <select value={perRow} onChange={handlePerRowChange}>
                                        {[1, 2, 3, 4, 5].map((val) => (
                                            <option key={val} value={val}>
                                                {val}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                {/* <label>
                Total photos:
                <input
                  type="number"
                  className="total-input"
                  value={totalPhotos}
                  onChange={handleTotalChange}
                />
              </label> */}
                            </div>
                        </div>

                        <div
                            className="photo-grid"
                            style={{
                                gridTemplateColumns: `repeat(${perRow}, 1fr)`,
                            }}
                        >
                            {photos.map((photo) => (
                                <Card
                                    key={photo.id}
                                    className="photo-card"
                                    cover={<img alt={photo.name} src={photo.src} />}
                                // actions={[
                                //   <SettingOutlined key="setting" />,
                                //   <EditOutlined key="edit" />,
                                //   <EllipsisOutlined key="ellipsis" />,
                                // ]}
                                >
                                    <Meta style={{ textAlign: 'center' }}
                                        //   avatar={
                                        //     <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                                        //   }
                                        title={photo.name}
                                        description={photo.subtitle}
                                    />
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default AdminHealing;
