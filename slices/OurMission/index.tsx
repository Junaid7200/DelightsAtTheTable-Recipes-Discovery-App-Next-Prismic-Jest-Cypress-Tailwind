import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type OurMissionProps = SliceComponentProps<Content.OurMissionSlice>;

const OurMission = ({ slice }: OurMissionProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#F5F2EE] py-24 sm:py-32"
    >
      <div className="w-full lg:w-[90%] max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-5 lg:px-6">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {slice.primary.heading}
          </h2>
          <div className="mt-6 text-base leading-7 text-gray-700">
            <PrismicRichText field={slice.primary.content_of_our_mission} />
          </div>
        </div>
        <div className="mt-16 sm:mt-20">
            <PrismicNextImage
              field={slice.primary.our_mission_image}
              className="w-full rounded-2xl object-cover"
            />
        </div>
      </div>
    </section>
  );
};

export default OurMission;