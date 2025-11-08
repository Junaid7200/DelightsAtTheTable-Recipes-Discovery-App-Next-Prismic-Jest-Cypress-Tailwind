import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `PageHeader`.
 */
export type PageHeaderProps = SliceComponentProps<Content.PageHeaderSlice>;

/**
 * Component for "PageHeader" Slices.
 */
const PageHeader = ({ slice }: PageHeaderProps) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-white"
    >
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {slice.primary.title}
        </h1>
        <div className="mt-6 text-lg leading-8 text-gray-600">
          {/* The 'description' field is a Key Text field, not Rich Text */}
          <p>{slice.primary.description}</p>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;