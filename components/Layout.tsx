import Head from 'next/head'

const Layout = (props:any) => (
    <div>
        <Head>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin='true'></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin="true"></script>
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="true"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"
/>
        </Head>
        {props.children}
    </div>
) 

export default Layout;
