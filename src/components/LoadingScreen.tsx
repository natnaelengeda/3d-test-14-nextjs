
const LoadingScreen = () => {
  return (
    <div
      style={{
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        zIndex: 1000,
      }}>
      <div
        style={{
          width: '50px',
          height: '50px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderRadius: '50%',
          borderTopColor: 'white',
          animation: 'spin 1s ease-in-out infinite',
          marginBottom: '20px',
        }} />
      <h2 style={{ margin: '10px 0' }}>Loading 3D Model</h2>
      <p style={{ margin: '0', opacity: 0.8 }}>Please wait...</p>

      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg) }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
