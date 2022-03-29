import Image from 'next/image'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'


export async function getStaticProps() {
  const supabaseAdmin=createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
  
  const {data}=await supabaseAdmin
  .from('images')
  .select('*')
  .order('id')
  
  return {
    props: {
      images: data
    }
  }
}


function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Image={
  id: number
  imageSrc: string
  name: string
  description: string
}

export default function Gallery({images}: {images: Image[]}) {
  
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 lg:max-w-7xl">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {
        images.map((image) => {
          return <BlurImage key={image.id} image={image}  />
        })
      }

      </div>

      <div className='pt-20'>
        <a href="https://youtu.be/BSoRXk1FIw8" className="text-blue-700">
      Building an Image Gallery with Next.js, Supabase, and Tailwind CSS
        </a>
      </div>
      
      
    </div>
  )
}

function BlurImage({image}: {image: Image}) {
  const [isLoading, setIsLoading]=useState(true)
  
  return (
    <a href={image.imageSrc} className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        
        <Image 
        alt="" 
        src={image.imageSrc}
        layout='fill'
        objectFit='cover'
        className={
          cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading ?
            'grayscale blur-2xl scale-110'
            : 'grayscale-0 blur-0 scale-100'
            
          )}
        onLoadingComplete={()=>setIsLoading(false)}       
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{image.description}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{image.name}</p>
    </a>
  )
}