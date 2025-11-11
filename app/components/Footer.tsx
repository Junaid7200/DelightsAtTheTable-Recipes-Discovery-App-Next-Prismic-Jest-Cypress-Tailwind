import { PrismicNextImage } from '@prismicio/next';
import { HomeDocument } from '@/prismicio-types';

export default function Footer({ page }: {page: HomeDocument}) {
    const socialIconsGroup = page.data.socials_icons[0];

    const icons = socialIconsGroup ? [
        socialIconsGroup.icon1,
        socialIconsGroup.icon2,
        socialIconsGroup.icon3,
        socialIconsGroup.icon4
    ] : [];

    return (
        <footer className="bg-[#FFDB63] py-16 lg:py-20">
            <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-[270px] w-full lg:w-[90%] max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-20 lg:px-30'>
                <div className="flex items-center gap-4">
                    <PrismicNextImage field={page.data.website_logo} />
                    <span className="text-2xl font-bold hidden lg:block">{page.data.website_name}</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                    <h3 className='font-bold text-xl'>{page.data.footer_text}</h3>
                    <div className="flex gap-4">
                        {icons.map((icon, index) => (
                            icon.url && <PrismicNextImage key={index} field={icon} />
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}