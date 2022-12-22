function Error({ statusCode }) {
  return (
    <p style={{ 
      display: 'flex',
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      fontSize: '3rem',
      fontWeight: 'bold',
    }}>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error