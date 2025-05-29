export const slideVariants = {
    enter: (direction) => ({
        x: direction === 'right' ? 300 : -300,
        opacity: 0,
        position: 'absolute',
    }),
    center: {
        x: 0,
        opacity: 1,
        position: 'relative',
    },
    exit: (direction) => ({
        x: direction === 'right' ? -300 : 300,
        opacity: 0,
        position: 'absolute',
    }),
}