import { PrismicNextImage } from '@prismicio/next';
import { HomeDocument } from '@/prismicio-types';

export default function Footer({ page }: {page: HomeDocument}) {
    // Access the first item in the group, which contains all your icon fields.
    const socialIconsGroup = page.data.socials_icons[0];

    // Create an array of the icon fields to map over.
    const icons = socialIconsGroup ? [
        socialIconsGroup.icon1,
        socialIconsGroup.icon2,
        socialIconsGroup.icon3,
        socialIconsGroup.icon4
    ] : [];

    return (
        <footer className="flex h-[200px] bg-[#FFDB63] justify-around items-center mt-4">
        <div className="flex items-center gap-4">
            <PrismicNextImage field={page.data.website_logo} width={50} height={50} />
            <span className="text-2xl font-bold">{page.data.website_name}</span>
        </div>
        <div className="flex flex-col items-center gap-2">
            <h3 className='font-bold text-xl'>{page.data.footer_text}</h3>
            <div className="flex gap-4">
                {icons.map((icon, index) => (
                    icon.url && <PrismicNextImage key={index} field={icon} width={24} height={24} />
                ))}
            </div>
        </div>
        </footer>
    )
}