import ScreenContainer from "./ScreenContainer";

export default function Terminal() {
  return (
    <ScreenContainer
      fadeOut={false}
      className="flex h-screen items-center justify-center text-4xl"
    >
      Hello World
    </ScreenContainer>
  );
}
