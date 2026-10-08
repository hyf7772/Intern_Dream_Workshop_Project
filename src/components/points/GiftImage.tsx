export function GiftImage({ image, name, large = false }: { image?: string; name: string; large?: boolean }) {
  return (
    <span className={`gift-image-placeholder${large ? ' large' : ''}`} aria-label={`${name}图片`}>
      {image ? <img src={image} alt={name} /> : <span aria-hidden="true">🎁</span>}
    </span>
  )
}
