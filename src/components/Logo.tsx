import classNames from "classnames"

const Logo = ({
  small,
  large,
  xl,
  white = false,
}: {
  small?: boolean

  large?: boolean
  xl?: boolean
  white?: boolean
}): JSX.Element => {
  const size: number = small ? 26 : large ? 40 : xl ? 60 : 30

  return (
    <div
      className={classNames("flex items-center space-x-3 text-2xl font-bold", {
        "text-xl": small,
        "text-4xl": large,
        "space-x-5 text-6xl font-black": xl,
        "text-emerald-600": !white,
        "text-white": white,
      })}
    >
      <svg width={size} height={size} viewBox="0 0 106.048 106.048">
        <g>
          <path
            fill={white ? "#fff" : "#059669"}
            d="M84.838,0H21.209C9.543,0,0,9.543,0,21.209v63.629c0,11.666,9.543,21.21,21.209,21.21h63.628
		c11.667,0,21.21-9.544,21.21-21.21V21.209C106.048,9.543,96.505,0,84.838,0z M68.755,83.761
		c-9.507-8.911-13.784-19.355-13.784-19.355h-0.155c0,0-4.406,10.843-14.188,19.355H13.256l39.03-55.432l-2.926-3.774l2.905-2.269
		l2.358,3.027v-0.016l0.016,0.016l2.361-3.027l2.91,2.269l-2.926,3.764l35.807,55.375L68.755,83.761z"
          />
        </g>
      </svg>

      <p>{process.env.NEXT_PUBLIC_APP_NAME}</p>
    </div>
  )
}

export default Logo
