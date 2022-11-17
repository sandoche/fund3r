import { Center, Loader } from '@mantine/core';

function LoadingAnimation() {
  return (
    <Center style={{ width: '100%', height: '90vh' }}>
      <Loader color="violet" />
    </Center>
  );
}

export default LoadingAnimation;
