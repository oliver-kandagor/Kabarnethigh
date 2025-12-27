
// Helper to load all magazine images
const magazineImages = import.meta.glob('/src/assets/School-photos/School-magazine/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

// Function to get image by approximate name (case insensitive, partial match)
export const getMagazineImage = (nameSearch: string): string | undefined => {
    const normalizedSearch = nameSearch.toLowerCase().replace(/[-_]/g, ' ');

    for (const path in magazineImages) {
        const filename = path.split('/').pop()?.toLowerCase().replace(/[-_]/g, ' ');
        if (filename?.includes(normalizedSearch)) {
            return magazineImages[path] as string;
        }
    }
    return undefined;
};

// Function to get all images
export const getAllMagazineImages = () => {
    return Object.values(magazineImages) as string[];
};

// Function to get images by page index (if adhering to numbered convention)
export const getPageImages = (pageIndex: number): string[] => {
    // This assumes some mapping, but since we rely on named files mostly now:
    return [];
}

// Function to get image by number (e.g. 0 -> 0.png or 0.jpg)
export const getMagazineImageByNumber = (num: number): string | undefined => {
    // Try various extensions
    const extensions = ['png', 'jpg', 'jpeg', 'webp'];
    for (const ext of extensions) {
        // Check for exact number file match
        for (const path in magazineImages) {
            // pattern: /.../5.jpg
            const filename = path.split('/').pop();
            if (filename === `${num}.${ext}`) {
                return magazineImages[path] as string;
            }
        }
    }
    return undefined;
};
