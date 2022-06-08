<div id="about" class="site-about py-5">
    <div class="container-fluid container-md">
        <div class="row">
            <!-- Page About me -->
            <div class="col-12 col-md-5">
                <?php echo get_the_post_thumbnail(29, 'full', array('class' => 'alignleft')); ?>
            </div>
            <div class="col-12 col-md-5 col-lg-4 offset-0 offset-lg-1">
                <?php
                echo '<h2 class="mb-5 display-4">' . get_post_field('post_title', 29) . '</h2>';
                $content = apply_filters('the_content', get_post_field('post_content', 29));
                echo $content;
                ?>
                <p class="mt-5 text-center">
                    <button type="button" class="btn btn-lg btn-outline-light rounded-0 mt-4 mt-lg-4"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal">Написать мастеру
                    </button>
                </p>
            </div>
        </div>
    </div>
</div><!-- #about -->