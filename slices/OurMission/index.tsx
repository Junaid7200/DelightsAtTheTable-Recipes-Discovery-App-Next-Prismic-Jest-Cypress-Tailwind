import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `OurMission`.
 */
export type OurMissionProps = SliceComponentProps<Content.OurMissionSlice>;

/**
 * Component for "OurMission" Slices.
 */
const OurMission = ({ slice }: OurMissionProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-[#F5F2EE] py-20 sm:py-32"
    >
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {slice.primary.heading}
          </h2>
          <div className="mt-6 text-base leading-7 text-gray-700">
            {/* Use the correct API ID: 'content_of_our_mission' */}
            <PrismicRichText field={slice.primary.content_of_our_mission} />
          </div>
        </div>
        <div className="mt-16 sm:mt-20">
            <PrismicNextImage
              // Use the correct API ID: 'our_mission_image'
              field={slice.primary.our_mission_image}
              className="w-full rounded-2xl object-cover"
              imgixParams={{ ar: "16:9", fit: "crop" }}
            />
        </div>
      </div>
    </section>
  );
};

export default OurMission;