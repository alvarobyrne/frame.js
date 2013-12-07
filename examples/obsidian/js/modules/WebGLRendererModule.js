( function ( config ) {

	var dom = document.createElement( 'div' );
	dom.style.position = 'absolute';
	dom.style.width = '100%';
	dom.style.height = '100%';

	var renderer = new THREE.WebGLRenderer( { antialias: true, preserveDrawingBuffer: true } );
	renderer.autoClear = false;
	renderer.domElement.style.position = 'absolute';
	dom.appendChild( renderer.domElement );

	var onWindowResize = function () {

		var scale = Math.min( dom.offsetWidth / config.width, dom.offsetHeight / config.height );

		var width = config.width * scale;
		var height = config.height * scale;

		renderer.setSize( width, height );
		renderer.domElement.style.left = ( dom.offsetWidth - width ) / 2 + 'px';
		renderer.domElement.style.top = ( dom.offsetHeight - height ) / 2 + 'px';

	};

	config.renderer = renderer;

	//

	return new FRAME.Module( {

		parameters: {

			dom: new FRAME.ModuleParameter.DOM( 'DOM', null ),
			clearColor: new FRAME.ModuleParameter.Boolean( 'Clear color', true ),
			clearDepth: new FRAME.ModuleParameter.Boolean( 'Clear depth', true ),
			clearStencil: new FRAME.ModuleParameter.Boolean( 'Clear stencil', true )

		},

		init: function ( parameters ) {

			if ( parameters.dom !== null ) {

				parameters.dom.appendChild( dom );
				parameters.dom = null; // TODO: Fix hack

				//

				window.addEventListener( 'resize', onWindowResize );

				onWindowResize();

			}

		},

		update: function ( parameters ) {

			renderer.clear( parameters.clearColor === true, parameters.clearDepth === true, parameters.clearStencil === true );

		}

	} );

} )