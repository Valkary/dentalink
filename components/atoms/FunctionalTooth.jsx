const FunctionalTooth = ({ colors, width, height, hovering, unHovering, clickToothArea }) => {

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 250 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="tooth" clipPath="url(#clip0_1_2)">
        <rect width="250" height="250" fill="white" />
        <g id="bottom">
          <mask id="path-1-inside-1_1_2" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M175 175H75L0 250H250L175 175Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M175 175H75L0 250H250L175 175Z"
            fill={colors.bottom}
            onMouseEnter={(e) => hovering(e)}
            onMouseLeave={(e) => unHovering(e)}
            onClick={() => clickToothArea(5)}
          />
          <path
            d="M175 175L175.707 174.293L175.414 174H175V175ZM75 175V174H74.5858L74.2929 174.293L75 175ZM0 250L-0.707107 249.293L-2.41421 251H0V250ZM250 250V251H252.414L250.707 249.293L250 250ZM175 174H75V176H175V174ZM74.2929 174.293L-0.707107 249.293L0.707107 250.707L75.7071 175.707L74.2929 174.293ZM0 251H250V249H0V251ZM250.707 249.293L175.707 174.293L174.293 175.707L249.293 250.707L250.707 249.293Z"
            fill="black"
            mask="url(#path-1-inside-1_1_2)"
          />
        </g>
        <g id="top">
          <mask id="path-3-inside-2_1_2" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M175 75H75L0 0H250L175 75Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M175 75H75L0 0H250L175 75Z"
            fill={colors.top}
            onMouseEnter={(e) => hovering(e)}
            onMouseLeave={(e) => unHovering(e)}
            onClick={() => clickToothArea(1)}
          />
          <path
            d="M175 75L175.707 75.7071L175.414 76H175V75ZM75 75V76H74.5858L74.2929 75.7071L75 75ZM0 0L-0.707107 0.707107L-2.41421 -1H0V0ZM250 0V-1H252.414L250.707 0.707107L250 0ZM175 76H75V74H175V76ZM74.2929 75.7071L-0.707107 0.707107L0.707107 -0.707107L75.7071 74.2929L74.2929 75.7071ZM0 -1H250V1H0V-1ZM250.707 0.707107L175.707 75.7071L174.293 74.2929L249.293 -0.707107L250.707 0.707107Z"
            fill="black"
            mask="url(#path-3-inside-2_1_2)"
          />
        </g>
        <g id="right">
          <mask id="path-5-inside-3_1_2" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M175 75V175L250 250V0L175 75Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M175 75V175L250 250V0L175 75Z"
            fill={colors.right}
            onMouseEnter={(e) => hovering(e)}
            onMouseLeave={(e) => unHovering(e)}
            onClick={() => clickToothArea(4)}
          />
          <path
            d="M175 75L174.293 74.2929L174 74.5858V75H175ZM175 175H174V175.414L174.293 175.707L175 175ZM250 250L249.293 250.707L251 252.414V250H250ZM250 0H251V-2.41421L249.293 -0.707107L250 0ZM174 75V175H176V75H174ZM174.293 175.707L249.293 250.707L250.707 249.293L175.707 174.293L174.293 175.707ZM251 250V0H249V250H251ZM249.293 -0.707107L174.293 74.2929L175.707 75.7071L250.707 0.707107L249.293 -0.707107Z"
            fill="black"
            mask="url(#path-5-inside-3_1_2)"
          />
        </g>
        <g id="left">
          <mask id="path-7-inside-4_1_2" fill="white">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M75 75L75 175L0 250L0 0L75 75Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M75 75L75 175L0 250L0 0L75 75Z"
            fill={colors.left}
            onMouseEnter={(e) => hovering(e)}
            onMouseLeave={(e) => unHovering(e)}
            onClick={() => clickToothArea(2)}
          />
          <path
            d="M75 75L75.7071 74.2929L76 74.5858V75H75ZM75 175H76V175.414L75.7071 175.707L75 175ZM0 250L0.707107 250.707L-1 252.414V250H0ZM0 0H-1V-2.41421L0.707107 -0.707107L0 0ZM76 75L76 175H74L74 75H76ZM75.7071 175.707L0.707107 250.707L-0.707107 249.293L74.2929 174.293L75.7071 175.707ZM-1 250L-1 0H1L1 250H-1ZM0.707107 -0.707107L75.7071 74.2929L74.2929 75.7071L-0.707107 0.707107L0.707107 -0.707107Z"
            fill="black"
            mask="url(#path-7-inside-4_1_2)"
          />
        </g>
        <rect
          id="center"
          x="75"
          y="75"
          width="100"
          height="100"
          fill={colors.center}
          onMouseEnter={(e) => hovering(e)}
          onMouseLeave={(e) => unHovering(e)}
          onClick={() => clickToothArea(3)}
        />
      </g>
      <defs>
        <clipPath id="clip0_1_2">
          <rect width="250" height="250" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default FunctionalTooth;