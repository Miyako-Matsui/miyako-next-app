'use client'
import { useState } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import styles from './page.module.css'
import { Button, Typography, Grid } from '@mui/material'
import Link from 'next/link'
import HouseIcon from '@mui/icons-material/House'

interface SearchCatImege {
  id: string
  url: string
  width: number
  heigth: number
}

interface IndexPageProps {
  initialCatImageUrl: string
}

const fetchCatImage = async (): Promise<SearchCatImege> => {
  const res = await fetch('https://api.thecatapi.com/v1/images/search')
  const result = await res.json()
  return result[0]
}

const Home: NextPage<IndexPageProps> = ({ initialCatImageUrl }) => {
  const [catImageUrl, setCatImageUrl] = useState(initialCatImageUrl)

  const handleCatClick = async () => {
    const catImage = await fetchCatImage()
    setCatImageUrl(catImage.url)
  }

  return (
    <>
      <Grid
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h2" style={{ margin: 3 }}>
          CatPixie
        </Typography>
        <Typography variant="h5" style={{ margin: 2 }}>
          Push the Meow button below to find your favorite cat picture
        </Typography>{' '}
        <img
          src={catImageUrl}
          alt="Cat picture"
          style={{ maxWidth: '100%', height: 'auto', margin: 30 }}
        />
        <Button variant="outlined" color="secondary" onClick={handleCatClick}>
          Meow
        </Button>
      </Grid>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Link href="https://miyakomatsui.netlify.app/">
          <HouseIcon />
        </Link>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<
  IndexPageProps
> = async () => {
  const catImage = await fetchCatImage()
  return {
    props: {
      initialCatImageUrl: catImage.url,
    },
  }
}

export default Home
