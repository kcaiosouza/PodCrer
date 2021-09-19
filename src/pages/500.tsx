import Image from 'next/image';
import Head from 'next/head';

import { HomepageComponent, ImageLinearOpacity } from '../styles/index';

export default function errSE() {
    const width = 600
    const height = 500
  return (
    <HomepageComponent>
        <Head>
            <title>Erro 500 | IGCGMusic</title>
        </Head>
        <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center', justifyContent: 'center', paddingTop: 30}}>
       <h2 style={{textAlign: 'center', marginBottom: 25}}>Essa página foi arrebatada... digo... não encontrada 😅 | Erro 500</h2>
       <ImageLinearOpacity>
        <Image id="igmerr"
        width={width}
        height={height}
        src="/errpage.svg" 
        alt="Err"
        objectFit="cover"
        />
       </ImageLinearOpacity>
       </div>
    </HomepageComponent>
  )
}