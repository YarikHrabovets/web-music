export const slideInFromTop = {
    hidden: {
        opacity: 0,
        y: '-100%'
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 300,
            damping: 30,
            duration: 0.4
        }
    },
    exit: {
        opacity: 0,
        y: '-100%',
        transition: { duration: 0.3 }
    }
}