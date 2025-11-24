import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { HomeDocument } from '@/prismicio-types';

export default function Footer({ page }: {page: HomeDocument}) {
    const socialIconsGroup = page.data.socials_icons[0];

    const icons = socialIconsGroup ? [
        {img: socialIconsGroup.icon1, link: socialIconsGroup.icon1_link},
        {img: socialIconsGroup.icon2, link: socialIconsGroup.icon2_link},
        {img: socialIconsGroup.icon3, link: socialIconsGroup.icon3_link},
        {img: socialIconsGroup.icon4, link: socialIconsGroup.icon4_link}
    ] : [];

    return (
        <footer className="bg-[#FFDB63] py-16 lg:py-20">
            <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-[400px] w-full lg:w-[90%] max-w-[1440px] 2xl:max-w-[1600px] mx-auto'>
                <div className="flex items-center gap-4">
                    <PrismicNextImage field={page.data.website_logo} width={49} height={49} />
                    <span className="text-[46px] text-[#2C2B2B] font-semibold hidden lg:block">{page.data.website_name}</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                    <h3 className='font-semibold text-[26px] text-[#000000] '>{page.data.footer_text}</h3>
                <div className="flex gap-4">
                    {icons.map(
                        ({ img, link }, index) =>
                        img?.url && (
                            link ? (
                            <PrismicNextLink key={index} field={link}>
                                <PrismicNextImage field={img} />
                            </PrismicNextLink>
                            ) : (
                            <PrismicNextImage key={index} field={img} />
                            )
                        )
                    )}
                </div>
                </div>
            </div>
        </footer>
    )
}