import React from 'react'

function AppBackground(WrappedComponent) {
    class Wrapper extends React.PureComponent {
		render() {
			return (
				<div className='relative min-h-screen bg-custom-dark overflow-hidden'>
                    <div className='fixed w-2/3 h-full -top-1/4 -left-32 bg-gradient-radial from-custom-purple to-custom-dark blur-[60px] rounded-full'></div>
                    <div className='fixed w-1/2 h-full -bottom-1/3 right-20 bg-gradient-radial from-custom-blue to-custom-dark blur-[60px] rounded-full'></div>
                    <div className='relative z-10 text-white'>
                        <WrappedComponent {...this.props} />
                    </div>
                </div>
			)
		}
	}
    return Wrapper
}

export default AppBackground
