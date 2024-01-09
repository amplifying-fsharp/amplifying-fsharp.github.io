import styled from "styled-components";
import { useEffect, useState } from "react";

const StyledDiv = styled.div`
  position: relative;
  outline: 2px solid var(--cyan-500);
  border-radius: var(--radius);
  padding: var(--spacing-500);
  text-align: center;
  max-width: var(--container-md);
  margin-inline: auto;

  blockquote {
    font-size: var(--font-700);
    padding-inline: var(--spacing-200);
    &::before {
      content: "“ ";
    }
    &::after {
      content: " „";
    }
  }

  figcaption {
    font-weight: 600;
    margin-block: var(--spacing-600);

    &::before {
      content: "—";
      margin-right: var(--spacing-100);
    }
  }

  a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: var(--spacing-200) var(--spacing-400);
    font-weight: 500;

    svg {
      margin-right: var(--spacing-200);
    }
  }

  > svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;

    &:hover {
      filter: brightness(90%);
    }

    &:first-of-type {
      left: 0;
    }

    &:last-of-type {
      right: 0;
    }
  }
`;

function BookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="#FFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64c-30.37-38-80-64-208-64c-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96m0 0v288"
      />
    </svg>
  );
}

function ChevronLeft({ onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 21 21"
      onClick={onClick}
    >
      <g transform="rotate(-90 10.5 10.5)">
        <path
          fill="none"
          stroke="#06d4d4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6.5 12.5l4-4l4 4"
        />
      </g>
    </svg>
  );
}

function ChevronRight({ onClick }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 21 21"
      onClick={onClick}
    >
      <g transform="rotate(90 10.5 10.5)">
        <path
          fill="none"
          stroke="#06d4d4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m6.5 12.5l4-4l4 4"
        />
      </g>
    </svg>
  );
}

function Testimonials({ testimonials }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const next = () => {
    setCurrentIdx((idx) => {
      return (idx + 1) % testimonials.length;
    });
  };

  useEffect(() => {
    const key = setTimeout(next, 5000);

    return () => {
      clearTimeout(key);
    };
  }, [currentIdx]);

  const current = testimonials[currentIdx];

  return (
    <StyledDiv>
      <blockquote>{current.data.preview}</blockquote>
      <figcaption>{current.data.author}</figcaption>
      <a className={"btn btn-cyan"} href={`/testimonials/${current.slug}`}>
        <BookIcon />
        Read more!
      </a>
      <ChevronLeft
        onClick={() => {
          setCurrentIdx(
            (idx) => (idx - 1 + testimonials.length) % testimonials.length,
          );
        }}
      />
      <ChevronRight onClick={next} />
    </StyledDiv>
  );
}

export default Testimonials;
