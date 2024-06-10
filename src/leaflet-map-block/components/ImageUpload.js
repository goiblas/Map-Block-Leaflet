import { MediaUpload } from "@wordpress/block-editor";
import { Button, Icon } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { trash } from '@wordpress/icons';

const ImageUpload = ({ onSelect, image }) => {
    return (
        <div style={{ marginBottom: 24 }}>
            <MediaUpload
                onSelect={onSelect}
                allowedTypes="image"
                render={({ open }) => (
                    <>
                        {!image?.url && (
                            <Button variant="secondary" onClick={open}>
                                {__("Upload Image", "map-block-leaflet")}
                            </Button>
                        )}
                        {image?.url && (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                                <Button style={{ padding: 0, height: 48 }} onClick={open}>
                                    <img src={image.url} alt="" style={{ height: 48, width: 48, objectFit: "contain" }} />
                                </Button>

                                <Button isDestructive onClick={() => onSelect(null)}>
                                    <Icon icon={trash} />
                                </Button>
                            </div>
                        )}
                    </>
                )}
            />
        </div >
    );
};

export default ImageUpload;
